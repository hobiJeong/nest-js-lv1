import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { ChatsGateway } from '@src/apis/chats/chats.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsModel } from '@src/apis/chats/entity/chats.entity';
import { CommonModule } from 'src/common/common.module';
import { ChatsMessagesService } from '@src/apis/chats/messages/messages.service';
import { MessagesModel } from '@src/apis/chats/messages/entity/messages.entity';
import { MessagesController } from '@src/apis/chats/messages/messages.controller';
import { AuthModule } from '@src/apis/auth/auth.module';
import { UsersModule } from '@src/apis/users/users.module';
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
