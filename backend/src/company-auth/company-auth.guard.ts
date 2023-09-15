import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CompanyAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const bearerToken = this.extractBearerToken(request);

    if (!bearerToken) {
      throw new ForbiddenException('Bearer token not found');
    }

    try {
      request.user = await this.getUserData(bearerToken); // Store user data in the request context
      return true;
    } catch (error) {
      throw new ForbiddenException('Invalid token');
    }
  }

  private extractBearerToken(request): string | null {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return null;
    }

    const [, token] = authHeader.split(' ');
    return token || null;
  }

  private async getUserData(token: string): Promise<any> {
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
      return response.data;
    } catch (error) {
      throw new ForbiddenException('Invalid token');
    }
  }
}
