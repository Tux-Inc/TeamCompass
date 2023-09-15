import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConversationService } from '../conversation.service';
import { UserService } from '../../user/user.service';
import { User } from '../../user/entity/user.entity';

@Injectable()
export class ConversationGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly conversationService: ConversationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = await this.userService.getUserByDistantId(
      request.user.id,
    );

    const conversationId = request.params.id;

    return this.conversationService.isUserInConversation(user, conversationId);
  }
}
