import { ChatState } from "../types/chatTypes";

const LOCAL_STORAGE_KEY = "chatState";

export const saveStateToLocalStorage = (state: ChatState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
    } catch (error) {
        console.error("Не удалось сохранить состояние в localStorage", error);
    }
};

export const loadStateFromLocalStorage = (): ChatState | undefined => {
    try {
        const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState) as ChatState;
    } catch (error) {
        console.error("Не удалось загрузить состояние из localStorage", error);
        return undefined;
    }
};

export const getItemFromLocalStore = (name: string) =>
    localStorage.getItem(name);
export const removeItemFromLocalStore = (name: string) =>
    localStorage.removeItem(name);
export const addItemLocalStore = (name: string, value: string) =>
    localStorage.setItem(name, value);
