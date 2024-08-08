import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { ChatsGateway } from '@modules/chats/chats.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsModel } from '@modules/chats/entity/chats.entity';
import { CommonModule } from 'src/common/common.module';
import { ChatsMessagesService } from '@modules/chats/messages/messages.service';
import { MessagesModel } from '@modules/chats/messages/entity/messages.entity';
import { MessagesController } from '@modules/chats/messages/messages.controller';
import { AuthModule } from '@modules/auth/auth.module';
import { UsersModule } from '@modules/users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatsModel, MessagesModel]),
    CommonModule,
    AuthModule,
    UsersModule,
    PrismaModule,
  ],
  controllers: [ChatsController, MessagesController],
  providers: [ChatsGateway, ChatsService, ChatsMessagesService],
})
export class ChatsModule {}
