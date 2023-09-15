import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Conversation } from '../../conversation/entity/conversation.entity';
import { Chat } from '../../chat/entity/chat.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  distant_id: number;

  @ManyToMany(() => Conversation, (conversation) => conversation.users)
  conversations?: Conversation[];

  @OneToMany(() => Chat, (chat) => chat.user)
  chats?: Chat[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at?: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at?: Date;
}
