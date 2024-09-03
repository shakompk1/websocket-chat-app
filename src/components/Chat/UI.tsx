import React, { useState } from "react";
import { useSocketContext } from "../../context/SocketContext";

const Chat: React.FC = () => {
    const [message, setMessage] = useState("");
    const { socket } = useSocketContext();

    const handleSendMessage = () => {
        if (socket && message) {
            socket.send(JSON.stringify({ message }));
            setMessage(""); // Очистить поле ввода после отправки
        }
    };

    return (
        <div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default Chat;
