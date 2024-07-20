import { MessagesModel } from '@src/apis/chats/messages/entity/messages.entity';
import { BaseModel } from 'src/common/entity/base.entity';
import { UsersModel } from '@src/apis/users/entity/users.entity';
import { Entity, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class ChatsModel extends BaseModel {
  @ManyToMany(() => UsersModel, (user) => user.chats)
  users: UsersModel[];

  @OneToMany(() => MessagesModel, (message) => message.chat)
  messages: MessagesModel[];
}
