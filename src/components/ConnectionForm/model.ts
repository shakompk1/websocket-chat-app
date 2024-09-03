import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store"; // Обновите путь к вашему файлу store
import { changeServerUrl, selectServerUrl } from "../../store/chatSlice";
import { useSocketContext } from "../../context/SocketContext";

interface UseModelReturn {
    serverUrl: string;
    handleServerUrlChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleConnectClick: () => void;
    handleDisconnectClick: () => void;
    connectionStatus: boolean;
    loading: boolean;
}

export const useModel = (): UseModelReturn => {
    const dispatch = useDispatch<AppDispatch>();
    const { connect, disconnect, connectionStatus, loading } =
        useSocketContext();
    const serverUrl = useSelector(selectServerUrl);

    const handleServerUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newUrl = event.target.value;
        dispatch(changeServerUrl(newUrl));
    };

    const handleConnectClick = () => {
        if (serverUrl) {
            connect();
        }
    };

    const handleDisconnectClick = () => {
        disconnect();
    };

    return {
        serverUrl,
        handleServerUrlChange,
        handleConnectClick,
        handleDisconnectClick,
        connectionStatus,
        loading,
    };
};
