import React from "react";

const UI = () => {
    return (
        <div className="h-74 bg-white/[0.25] rounded-xl p-4 flex justify-between shadow-lg gap-2 flex-shrink-0">
            <div className="w-10/12 ">
                <input
                    type="text"
                    className="w-full h-11 bg-white/[0.25] rounded-md"
                />
            </div>
            <div className="w-2/12">
                <button className="h-11 w-full px-8 rounded-md bg-confirmation text-white text-sm disabled:opacity-30">
                    Подключить
                </button>
            </div>
        </div>
    );
};

export default UI;
