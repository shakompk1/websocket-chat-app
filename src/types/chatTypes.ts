import { Message } from "./messageTypes";

export interface ChatState {
    messages: Message[];
    serverUrl: string;
}
