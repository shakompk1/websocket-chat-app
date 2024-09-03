import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "../store/chatSlice";
import { AppDispatch } from "../store";
import { Message } from "../types/messageTypes";

export const useWebSocket = (serverUrl: string | null) => {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if (!serverUrl) return;

        const socket = new WebSocket(serverUrl);

        socket.onopen = () => {
            console.log("Connected to WebSocket server");
        };

        socket.onmessage = (event) => {
            const message: Message = JSON.parse(event.data);
            dispatch(addMessage({ text: message.text, isSent: false }));
        };

        socket.onclose = () => {
            console.log("Disconnected from WebSocket server");
        };

        return () => {
            socket.close();
        };
    }, [serverUrl, dispatch]);
};
