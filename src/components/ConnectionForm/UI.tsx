import { useModel } from "./model";

const UI = (): JSX.Element => {
    const {
        serverUrl,
        handleServerUrlChange,
        handleConnectClick,
        handleDisconnectClick,
        connectionStatus,
        loading,
    } = useModel();

    return (
        <div className="m-h-74 bg-white/[0.25] rounded-xl p-4 flex flex-col sm:flex-row sm:items-start gap-y-2 sm:gap-x-3.5 shadow-lg">
            <div className="flex flex-col sm:flex-row gap-y-2 sm:gap-x-3.5 flex-grow">
                <input
                    type="text"
                    value={serverUrl}
                    onChange={handleServerUrlChange}
                    className="w-full max-w-[640px] text-white p-2 h-11 bg-white/[0.25] rounded-md"
                />
                <div className="flex flex-col sm:flex-row gap-y-2 sm:gap-x-3.5 mt-2 sm:mt-0">
                    <button
                        onClick={handleConnectClick}
                        className="h-11 px-8 rounded-md bg-confirmation text-white text-sm disabled:opacity-30"
                        disabled={!connectionStatus}
                    >
                        Подключить
                    </button>
                    <button
                        onClick={handleDisconnectClick}
                        className="h-11 px-8 rounded-md bg-rejection text-white text-sm disabled:opacity-30"
                        disabled={connectionStatus}
                    >
                        Отключить
                    </button>
                </div>
            </div>
            {loading ? (
                "Loading..."
            ) : (
                <div
                    className={`text-sm ${
                        connectionStatus ? `text-red-600` : `text-green-600`
                    } mt-2 sm:mt-0`}
                >
                    Статус: {connectionStatus ? "оффлайн" : "онлайн"}
                </div>
            )}
        </div>
    );
};

export default UI;
