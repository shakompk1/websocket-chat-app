import {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../store/chatSlice";
import { RootState } from "../store";

interface SocketContextProps {
    socket: WebSocket | null;
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
    const serverUrl = useSelector((state: RootState) => state.chat.serverUrl);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!serverUrl) return;

        const ws = new WebSocket(serverUrl);

        ws.onopen = () => {
            console.log("Connected to WebSocket server");
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            dispatch(addMessage({ text: message.message, isSent: false }));
        };

        ws.onclose = (event) => {
            console.log("Disconnected from WebSocket server", event.reason);
        };

        setSocket(ws);

        return () => {
            ws.close();
        };
    }, [serverUrl, dispatch]);

    useEffect(() => {
        if (socket) {
            // Additional socket event handlers can be set up here if needed
        }
    }, [socket]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};
