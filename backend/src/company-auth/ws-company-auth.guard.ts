import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WsException } from '@nestjs/websockets';
import axios from 'axios';
import { UserService } from '../user/user.service';
import { User } from '../user/entity/user.entity';

@Injectable()
export class WsCompanyAuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();
    const bearerToken = client.handshake.headers.authorization;

    if (!bearerToken) {
      throw new WsException('Bearer token not found');
    }

    try {
      client.user = await this.getUserData(bearerToken); // Store user data in the request context
      return true;
    } catch (error) {
      throw new WsException('Invalid token');
    }
  }

  private async getUserData(token: string): Promise<User | undefined> {
    const apiUrl =
      this.configService.get<string>('EXPO_PUBLIC_API_URL') + '/employees/me';

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Group-Authorization': this.configService.get<string>(
            'EXPO_PUBLIC_API_TOKEN',
          ),
        },
      });
      return this.userService.getUserByDistantId(response.data.id);
    } catch (error) {
      throw new WsException('Invalid token');
    }
  }
}
