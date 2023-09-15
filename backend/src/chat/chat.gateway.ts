import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Socket } from 'socket.io';
import { Chat } from './entity/chat.entity';
import { ConversationService } from '../conversation/conversation.service';
import { Conversation } from '../conversation/entity/conversation.entity';
import { UseGuards } from '@nestjs/common';
import { WsCompanyAuthGuard } from '../company-auth/ws-company-auth.guard';
import { ChatWSDto } from './dto/chatWS.dto';
import { ClientWSAuth } from './dto/clientWSAuth.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly chatService: ChatService,
    private readonly conversationService: ConversationService,
  ) {}

  @WebSocketServer() server: any;

  @UseGuards(WsCompanyAuthGuard)
  @SubscribeMessage('newMessage')
  async handleNewMessage(
    client: ClientWSAuth,
    payload: ChatWSDto,
  ): Promise<void> {
    const chat: Chat = new Chat();
    chat.message = payload.message;
    chat.user = client.user;
    chat.status = 1;
    await this.conversationService.sendMessage(payload.conversation_id, chat);
    this.server.emit('recvMessage', chat);
  }

  afterInit(server: any): any {
    // console.log('Init', server);
  }

  handleDisconnect(client: any): any {
    console.log('Disconnect', client.id);
  }

  handleConnection(client: Socket, ...args: any[]): any {
    console.log('Connection', client.id);
  }
}
