import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    loadStateFromLocalStorage,
    saveStateToLocalStorage,
} from "../utils/localStorage";

interface Message {
    text: string;
    isSent: boolean;
}

interface ChatState {
    messages: Message[];
    serverUrl: string;
}

const initialState: ChatState = loadStateFromLocalStorage() || {
    messages: [],
    serverUrl: "",
};

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
            saveStateToLocalStorage(state);
        },
        changeServerUrl: (state, action: PayloadAction<string>) => {
            state.serverUrl = action.payload;
            saveStateToLocalStorage(state);
        },
        deleteMessage: (state, action: PayloadAction<number>) => {
            state.messages.splice(action.payload, 1);
            saveStateToLocalStorage(state);
        },
        clearMessages: (state) => {
            state.messages = [];
            saveStateToLocalStorage(state);
        },
    },
});

export const { addMessage, changeServerUrl, deleteMessage, clearMessages } =
    chatSlice.actions;
export default chatSlice.reducer;

//Selectors
export const selectServerUrl = (state: { chat: ChatState }) =>
    state.chat.serverUrl;

export const selectMessageList = (state: { chat: ChatState }) =>
    state.chat.messages;
