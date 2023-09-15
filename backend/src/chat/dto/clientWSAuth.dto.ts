import { Socket } from 'socket.io';
import { User } from '../../user/entity/user.entity';

export interface ClientWSAuth extends Socket {
  user: User;
}
