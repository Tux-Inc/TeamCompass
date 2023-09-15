import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Conversation } from '../../conversation/entity/conversation.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'longtext' })
  message: string;

  @Column({ default: 0 })
  status: number;

  @ManyToOne(() => User, (User) => User.chats)
  user: User;

  @ManyToOne(() => Conversation, (conversation) => conversation.chats)
  conversation: Conversation;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at?: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at?: Date;
}
