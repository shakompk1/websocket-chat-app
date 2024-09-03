// context/SocketContextProvider.tsx

import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, clearMessages } from "../store/chatSlice";
import { RootState } from "../store";
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
    const serverUrl = useSelector((state: RootState) => state.chat.serverUrl);
    const dispatch = useDispatch();

    const connect = () => {
        if (!serverUrl) return;

        const ws = new WebSocket(serverUrl);

        ws.onopen = () => {
            console.log("Connected to WebSocket server");
            setConnectionStatus("connected");
            addItemLocalStore("websocketConnected", "true");
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            dispatch(addMessage({ text: message.text, isSent: true }));
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
            setConnectionStatus("error");
            removeItemFromLocalStore("websocketConnected");
        };

        ws.onclose = (event) => {
            console.log("Disconnected from WebSocket server", event.reason);
            setConnectionStatus("disconnected");
            removeItemFromLocalStore("websocketConnected");
            dispatch(clearMessages());
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
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};
