import React from "react";

const UI = () => {
    return (
        <div className="h-74 bg-white/[0.25] rounded-xl p-4 flex justify-between shadow-lg flex-shrink-0">
            <div className="flex gap-x-3.5">
                <input
                    type="text"
                    className="w-[640px] h-11 bg-white/[0.25] rounded-md"
                />
                <button className="h-11 px-8 rounded-md bg-confirmation text-white text-sm disabled:opacity-30">
                    Подключить
                </button>
                <button
                    className="h-11 px-8 rounded-md bg-rejection text-white text-sm disabled:opacity-30"
                    disabled
                >
                    Отключить
                </button>
            </div>
            <div className="text-sm text-red-600">Статус: оффлайн</div>
        </div>
    );
};

export default UI;
