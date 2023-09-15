import {Chat} from "./Chat";

export interface IConversation {
    id: number;
    title: string;
    image: string;
    chats: Chat[];
    created_at: Date;
    updated_at: Date;
}