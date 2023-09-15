import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entity/chat.entity';
import { Repository } from 'typeorm';
import { Conversation } from '../conversation/entity/conversation.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private readonly chatRepository: Repository<Chat>,
  ) {}

/**
 * The function `getChat` retrieves a chat object from the chat repository based on the provided id.
 * @param {number} id - The `id` parameter is a number that represents the unique identifier of a chat.
 * It is used to retrieve a specific chat from the chat repository.
 * @returns The `getChat` function is returning a Promise that resolves to a `Chat` object.
 */
  async getChat(id: number): Promise<Chat> {
    return await this.chatRepository.findOne({ where: { id } });
  }

/**
 * The function `getLatestChatByConversation` retrieves the latest chat message in a conversation.
 * @param {Conversation} conversation - The conversation parameter is an object representing a
 * conversation. It is used to filter the chat messages and retrieve the latest chat message in that
 * conversation.
 * @returns a promise that resolves to an array of Chat objects.
 */
  async getLatestChatByConversation(
    conversation: Conversation,
  ): Promise<Chat[]> {
    return await this.chatRepository.find({
      where: { conversation },
      order: { updated_at: 'DESC' },
      take: 1,
    });
  }

/**
 * The function creates a chat and returns a promise of the created chat.
 * @param {Chat} chat - The parameter `chat` is an object of type `Chat` that represents a chat
 * conversation.
 * @returns The `createChat` function is returning a Promise that resolves to a `Chat` object.
 */
  async createChat(chat: Chat): Promise<Chat> {
    return await this.chatRepository.save(chat);
  }

/**
 * The function `getChats` returns a promise that resolves to an array of `Chat` objects.
 * @returns a Promise that resolves to an array of Chat objects.
 */
  async getChats(): Promise<Chat[]> {
    return await this.chatRepository.find();
  }
}
