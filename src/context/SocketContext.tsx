// context/SocketContextProvider.tsx

import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, clearMessages, selectServerUrl } from "../store/chatSlice";
import {
    removeItemFromLocalStore,
    addItemLocalStore,
    getItemFromLocalStore,
} from "../utils/localStorage";

interface SocketContextProps {
    socket: WebSocket | null;
    connect: () => void;
    disconnect: () => void;
    sendMessage: (message: string) => void;
    connectionStatus: boolean;
    loading: boolean;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const useSocketContext = () => {
    const context = useContext(SocketContext);
    if (context === undefined) {
        throw new Error(
            "useSocketContext must be used within a SocketContextProvider",
        );
    }
    return context;
};

interface SocketContextProviderProps {
    children: ReactNode;
}

export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({
    children,
}) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [connectionStatus, setConnectionStatus] = useState<
        "connected" | "disconnected" | "error"
    >("disconnected");
    const [loading, setLoading] = useState<boolean>(false);
    const [connectionTimer, setConnectionTimer] = useState<number | null>(null);
    const serverUrl = useSelector(selectServerUrl);
    const dispatch = useDispatch();

    const connect = () => {
        if (!serverUrl) return;

        setLoading(true); // Устанавливаем состояние загрузки

        const ws = new WebSocket(serverUrl);

        // Устанавливаем таймер для проверки состояния подключения
        const timer = setTimeout(() => {
            if (connectionStatus === "disconnected") {
                console.log("Connection timed out");
                ws.close();
                setLoading(false);
            }
        }, 10000);

        setConnectionTimer(timer);
        ws.onopen = () => {
            console.log("Connected to WebSocket server");
            setConnectionStatus("connected");
            addItemLocalStore("websocketConnected", "true");
            setLoading(false); // Снимаем состояние загрузки
            if (connectionTimer) clearTimeout(connectionTimer); // Останавливаем таймер
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            dispatch(addMessage({ text: message.text, isSent: true }));
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
            setConnectionStatus("error");
            removeItemFromLocalStore("websocketConnected");
            setLoading(false); // Снимаем состояние загрузки
            if (connectionTimer) clearTimeout(connectionTimer); // Останавливаем таймер
        };

        ws.onclose = (event) => {
            console.log("Disconnected from WebSocket server", event.reason);
            setConnectionStatus("disconnected");
            removeItemFromLocalStore("websocketConnected");
            dispatch(clearMessages());
            setLoading(false); // Снимаем состояние загрузки
            if (connectionTimer) clearTimeout(connectionTimer); // Останавливаем таймер
        };

        setSocket(ws);
    };

    const sendMessage = (message: string) => {
        if (socket && message.trim()) {
            const messageToSend = { text: message };
            socket.send(JSON.stringify(messageToSend));
            dispatch(addMessage({ text: message, isSent: false }));
        } else if (connectionStatus === "error") {
            dispatch(
                addMessage({
                    text: "Cannot send message, WebSocket is not connected.",
                    isSent: false,
                }),
            );
        }
    };

    const disconnect = () => {
        if (socket) {
            socket.close();
            setSocket(null);
            setConnectionStatus("disconnected");
            removeItemFromLocalStore("websocketConnected");
            dispatch(clearMessages());
            setLoading(false); // Снимаем состояние загрузки
            if (connectionTimer) clearTimeout(connectionTimer); // Останавливаем таймер
        }
    };

    useEffect(() => {
        const savedConnectionStatus =
            getItemFromLocalStore("websocketConnected");
        if (savedConnectionStatus === "true") {
            connect();
        }

        return () => {
            disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider
            value={{
                socket,
                connect,
                disconnect,
                sendMessage,
                connectionStatus: !(connectionStatus === "connected"),
                loading,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};
