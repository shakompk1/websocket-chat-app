import { useModel } from "./model";

const UI = () => {
    const { message, setMessage, handleSendMessage, connectionStatus } =
        useModel();
    return (
        <div className="m-h-74 bg-white/[0.25] rounded-xl p-4 flex flex-col sm:flex-row justify-between shadow-lg gap-2 flex-shrink-0">
            <div className="flex-grow">
                <input
                    type="text"
                    className="w-full h-11 p-2 bg-white/[0.25] rounded-md text-white"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>
            <div className="flex-shrink-0 mt-2 sm:mt-0 sm:w-2/12">
                <button
                    onClick={handleSendMessage}
                    className="h-11 w-full rounded-md bg-confirmation text-white text-sm disabled:opacity-30"
                    disabled={connectionStatus}
                >
                    Отправить
                </button>
            </div>
        </div>
    );
};

export default UI;
