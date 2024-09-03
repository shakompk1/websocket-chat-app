import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
    text: string;
    isSent: boolean;
}

interface ChatState {
    messages: Message[];
    serverUrl: string;
}

const initialState: ChatState = {
    messages: [],
    serverUrl: "wss://ws.postman-echo.com/raw",
};


export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
        },
        connectToServer: (state, action: PayloadAction<string>) => {
            state.serverUrl = action.payload;
        },
    },
});


export const { addMessage, connectToServer } = chatSlice.actions;
export default chatSlice.reducer;
