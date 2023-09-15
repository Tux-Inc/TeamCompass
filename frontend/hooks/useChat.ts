import {IConversation} from "../types/Conversation";
import {axiosTCClient} from "../services/tcClient";
import {getEmployee} from "./useEmployees";
import {IFullUser} from "../types/FullUser";

/**
 * The function retrieves conversations from a server and converts the date strings in the response to
 * Date objects.
 * @returns a Promise that resolves to an array of IConversation objects.
 */
export async function getConversations(): Promise<IConversation[]> {
    const response = await axiosTCClient.get('/conversation');
    response.data.forEach((conversation: IConversation) => {
        conversation.chats.forEach((chat) => {
            chat.created_at = new Date(chat.created_at);
            chat.updated_at = new Date(chat.updated_at);
        });
        conversation.created_at = new Date(conversation.created_at);
        conversation.updated_at = new Date(conversation.updated_at);
    });
    return response.data;
}

/**
 * The function `getConversation` retrieves a conversation object from the server and converts the
 * `created_at` and `updated_at` properties to `Date` objects.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of a
 * conversation. It is used to fetch the conversation data from the server.
 * @returns a Promise that resolves to an object of type IConversation.
 */
export async function getConversation(id: string): Promise<IConversation> {
    const response = await axiosTCClient.get(`/conversation/${id}`);
    response.data.created_at = new Date(response.data.created_at);
    response.data.updated_at = new Date(response.data.updated_at);
    return response.data;
}

/**
 * The function creates a conversation with a user and adds the user as a participant.
 * @param {string} userId - The `userId` parameter is a string that represents the unique identifier of
 * a user.
 * @returns a Promise that resolves to an object of type IConversation.
 */
export async function createConversation(userId: string): Promise<IConversation> {
    const user: IFullUser = await getEmployee(userId);
    const conversation = {
        title: user.surname + ' ' + user.name,
        image: 'https://i.imgur.com/0y8Ftya.png',
    };

    const usersIds = [userId];

    const responseCreate = await axiosTCClient.post('/conversation', conversation);
    const responseAddUser = await axiosTCClient.post(`/conversation/${responseCreate.data.id}/add-participant`, usersIds);
    responseAddUser.data.created_at = new Date(responseAddUser.data.created_at);
    responseAddUser.data.updated_at = new Date(responseAddUser.data.updated_at);
    return responseAddUser.data;
}