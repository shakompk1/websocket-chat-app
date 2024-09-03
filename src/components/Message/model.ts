import { useDispatch, useSelector } from "react-redux";
import { deleteMessage, selectMessageList } from "../../store/chatSlice";
import { Message } from "../../types/messageTypes";
import { useState } from "react";

interface UseModelReturn {
    messages: Message[];
    isModalOpen: boolean;
    openModal: (id: number) => void;
    closeModal: () => void;
    confirmDelete: () => void;
    messageToDelete: number | null;
    handleOutsideClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const useModel = (): UseModelReturn => {
    const messages = useSelector(selectMessageList);
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messageToDelete, setMessageToDelete] = useState<number | null>(null);

    const openModal = (id: number) => {
        setMessageToDelete(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setMessageToDelete(null);
    };

    const confirmDelete = () => {
        if (messageToDelete !== null) {
            dispatch(deleteMessage(messageToDelete));
        }
        closeModal();
    };
    const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if ((event.target as HTMLElement).id === "modalOverlay") {
            closeModal();
        }
    };

    return {
        messages,
        isModalOpen,
        openModal,
        closeModal,
        confirmDelete,
        messageToDelete,
        handleOutsideClick,
    };
};
