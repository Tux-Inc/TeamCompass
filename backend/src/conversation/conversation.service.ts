import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from './entity/conversation.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { User } from '../user/entity/user.entity';
import { Chat } from '../chat/entity/chat.entity';
import { ChatService } from '../chat/chat.service';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    private readonly usersService: UserService,
    private readonly chatService: ChatService,
  ) {}

/**
 * The function `getConversation` retrieves a conversation with a specific ID, including its associated
 * chats and the users who sent those chats.
 * @param {number} id - The `id` parameter is the unique identifier of the conversation that you want
 * to retrieve.
 * @returns The `getConversation` function is returning a Promise that resolves to a `Conversation`
 * object.
 */
  async getConversation(id: number): Promise<Conversation> {
    return await this.conversationRepository.findOne({
      where: { id },
      relations: ['chats', 'chats.user'],
    });
  }

/**
 * The function `getConversations` returns a promise that resolves to an array of Conversation objects.
 * @returns The `getConversations` method is returning a promise that resolves to an array of
 * `Conversation` objects.
 */
  async getConversations(): Promise<Conversation[]> {
    return await this.conversationRepository.find();
  }

/**
 * The function retrieves conversations for a given user and populates them with the latest chat
 * messages.
 * @param {number} distant_id - The `distant_id` parameter is a number that represents the unique
 * identifier of a user.
 * @returns an array of Conversation objects.
 */
  async getMyConversations(distant_id: number): Promise<Conversation[]> {
    const user: User = await this.usersService.getUserByDistantId(distant_id);
    const conversations = await this.conversationRepository.find({
      where: { users: [user] },
    });
    for (const conversation of conversations) {
      conversation.chats = await this.chatService.getLatestChatByConversation(
        conversation,
      );
    }
    return conversations;
  }

/**
 * The function creates a new conversation with a user and saves it to the conversation repository.
 * @param {Conversation} conversation - The `conversation` parameter is an object of type
 * `Conversation` which represents the conversation to be created.
 * @param {number} distant_id - The `distant_id` parameter is a number that represents the unique
 * identifier of a user in the system.
 * @returns a Promise that resolves to a Conversation object.
 */
  async createConversation(
    conversation: Conversation,
    distant_id: number,
  ): Promise<Conversation> {
    const user: User = await this.usersService.getUserByDistantId(distant_id);
    let newConversation: Conversation = new Conversation();
    newConversation = { ...conversation, users: [user] };
    return await this.conversationRepository.save(newConversation);
  }

/**
 * The function `deleteConversation` deletes a conversation from the conversation repository based on
 * its ID.
 * @param {number} id - The `id` parameter is a number that represents the unique identifier of the
 * conversation that needs to be deleted.
 */
  async deleteConversation(id: number): Promise<void> {
    await this.conversationRepository.delete(id);
  }

/**
 * The `leaveConversation` function removes a user from a conversation and deletes the conversation if
 * there are no remaining users.
 * @param {number} id - The `id` parameter represents the ID of the conversation that the user wants to
 * leave.
 * @param {number} distant_id - The `distant_id` parameter is the ID of the user who wants to leave the
 * conversation.
 */
  async leaveConversation(id: number, distant_id: number): Promise<void> {
    const user: User = await this.usersService.getUserByDistantId(distant_id);
    const conversation: Conversation =
      await this.conversationRepository.findOne({
        where: { id },
        relations: ['users'],
      });
    conversation.users = conversation.users.filter((u) => u.id !== user.id);
    if (conversation.users.length === 0) {
      await this.deleteConversation(id);
    } else {
      await this.conversationRepository.save(conversation);
    }
  }

/**
 * The function adds participants to a conversation by finding the conversation, retrieving the users
 * based on their distant IDs, and then saving the updated conversation.
 * @param {number} id - The `id` parameter is the ID of the conversation to which the participants will
 * be added.
 * @param {number[]} distantIDs - An array of numbers representing the IDs of the users to be added to
 * the conversation.
 * @returns a Promise that resolves to a Conversation object.
 */
  async addParticipantToConversation(
    id: number,
    distantIDs: number[],
  ): Promise<Conversation> {
    const conversation: Conversation =
      await this.conversationRepository.findOne({
        where: { id },
        relations: ['users'],
      });
    for (const distantID of distantIDs) {
      const user: User = await this.usersService.getUserByDistantId(distantID);
      conversation.users.push(user);
    }
    return await this.conversationRepository.save(conversation);
  }

/**
 * The function sends a message by finding a conversation based on an ID, assigning it to the chat
 * object, and then creating a new chat using the chat service.
 * @param {number} id - The `id` parameter is a number that represents the identifier of the
 * conversation. It is used to find the conversation in the conversation repository.
 * @param {Chat} chat - The `chat` parameter is an object of type `Chat`. It contains information about
 * the chat message that needs to be sent.
 * @returns a Promise that resolves to a Chat object.
 */
  async sendMessage(id: number, chat: Chat): Promise<Chat> {
    chat.conversation = await this.conversationRepository.findOne({
      where: { id },
    });
    console.log(chat);
    return await this.chatService.createChat(chat);
  }

/**
 * The function checks if a user is part of a conversation by searching for the user in the
 * conversation's list of users.
 * @param {User} user - The "user" parameter is an object representing a user. It likely contains
 * properties such as id, name, email, etc., which are used to identify the user.
 * @param {number} conversationId - The `conversationId` parameter is the unique identifier of the
 * conversation. It is used to find the conversation in the conversation repository.
 * @returns a Promise that resolves to a boolean value.
 */
  async isUserInConversation(
    user: User,
    conversationId: number,
  ): Promise<boolean> {
    const conversation: Conversation =
      await this.conversationRepository.findOne({
        where: { id: conversationId },
        relations: ['users'],
      });
    if (!conversation) return false;
    const userInConversation = conversation.users.find((u) => u.id === user.id);
    return !!userInConversation;
  }
}
