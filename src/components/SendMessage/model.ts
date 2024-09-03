import { Dispatch, SetStateAction, useState } from "react";
import { useSocketContext } from "../../context/SocketContext";

interface UseModelReturn {
    message: string;
    setMessage: Dispatch<SetStateAction<string>>;
    handleSendMessage: () => void;
    connectionStatus: boolean;
}
export const useModel = (): UseModelReturn => {
    const [message, setMessage] = useState<string>("");
    const { sendMessage, connectionStatus } = useSocketContext();

    const handleSendMessage = () => {
        sendMessage(message);
        sendMessage("");
    };

    return { message, setMessage, handleSendMessage, connectionStatus };
};
