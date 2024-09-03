const UI = () => {
    const messages = [1, 2, 3, 4, 5, 6];

    return (
        <div className="flex flex-col-reverse h-full">
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={`p-2 rounded mb-2 bg-gray-300 text-black border`}
                >
                    {msg}
                </div>
            ))}
        </div>
    );
};

export default UI;
