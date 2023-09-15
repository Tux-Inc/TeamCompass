import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Chat } from '../../chat/entity/chat.entity';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title: string;

  @Column()
  image: string;

  @ManyToMany(() => User, (users) => users.conversations)
  @JoinTable()
  users: User[];

  @OneToMany(() => Chat, (chat) => chat.conversation, { onDelete: 'CASCADE' })
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
