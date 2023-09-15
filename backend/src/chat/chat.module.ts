import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entity/chat.entity';
import { ConversationService } from '../conversation/conversation.service';
import { ChatService } from './chat.service';
import { UserService } from '../user/user.service';
import { ConversationModule } from '../conversation/conversation.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat]),
    forwardRef(() => ConversationModule),
    UserModule,
  ],
  providers: [ChatService, ConversationService, UserService],
  exports: [ChatService, TypeOrmModule],
})
export class ChatModule {}
