import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { Conversation } from './entity/conversation.entity';
import { CompanyAuthGuard } from '../company-auth/company-auth.guard';
import { ConversationGuard } from './conversation-guard/conversation.guard';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  @UseGuards(CompanyAuthGuard)
  createConversation(
    @Body() conversation: Conversation,
    @Req() req: any,
  ): Promise<Conversation> {
    return this.conversationService.createConversation(
      conversation,
      req.user.id,
    );
  }

  @Get()
  @UseGuards(CompanyAuthGuard)
  getConversations(@Req() req: any): Promise<Conversation[]> {
    return this.conversationService.getMyConversations(req.user.id);
  }

  @Get('/:id')
  @UseGuards(CompanyAuthGuard, ConversationGuard)
  getConversation(@Param() params: any): Promise<Conversation> {
    return this.conversationService.getConversation(params.id);
  }

  @Post('/:id/add-participant')
  @UseGuards(CompanyAuthGuard)
  addParticipantToConversation(
    @Param() params: any,
    @Body() distantIDs: number[],
  ): Promise<Conversation> {
    return this.conversationService.addParticipantToConversation(
      params.id,
      distantIDs,
    );
  }

  @Post('/:id/leave')
  @UseGuards(CompanyAuthGuard, ConversationGuard)
  leaveConversation(@Param() params: any, @Req() req: any): Promise<void> {
    return this.conversationService.leaveConversation(params.id, req.user.id);
  }
}
