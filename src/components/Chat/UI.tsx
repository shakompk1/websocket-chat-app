import ConnectionForm from "../ConnectionForm";
import SendMessage from "../SendMessage";
import Message from "../Message";

const UI = () => {
    return (
        <div className="h-screen flex flex-col w-screen bg-custom-background bg-cover bg-center p-7.5">
            <ConnectionForm />
            <div className="flex-grow overflow-auto p-4">
                <Message />
            </div>
            <SendMessage />
        </div>
    );
};

export default UI;
