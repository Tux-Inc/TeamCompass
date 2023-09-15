import { forwardRef, Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './entity/conversation.entity';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { ChatModule } from '../chat/chat.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation]),
    UserModule,
    forwardRef(() => ChatModule),
  ],
  providers: [ConversationService, UserService],
  controllers: [ConversationController],
  exports: [ConversationService, TypeOrmModule],
})
export class ConversationModule {}
