import { useModel } from "./model";

const UI = (): JSX.Element => {
    const {
        messages,
        isModalOpen,
        openModal,
        closeModal,
        confirmDelete,
        handleOutsideClick,
    } = useModel();

    return (
        <>
            <div className="flex flex-col-reverse h-full">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`relative p-2 rounded mb-2 bg-white/[0.25] w-3/5 rounded-xl text-white border ${
                            msg.isSent ? "self-end" : "self-start"
                        }`}
                    >
                        {msg.text}
                        <button
                            onClick={() => openModal(index)}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        >
                            Удалить
                        </button>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div
                    id="modalOverlay"
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={handleOutsideClick}
                >
                    <div className="bg-white p-4 rounded shadow-lg">
                        <h2 className="text-xl mb-4">Подтверждение удаления</h2>
                        <p className="mb-4">
                            Вы уверены, что хотите удалить это сообщение?
                        </p>
                        <div className="flex justify-end">
                            <button
                                onClick={confirmDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                            >
                                Удалить
                            </button>
                            <button
                                onClick={closeModal}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Отмена
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UI;
