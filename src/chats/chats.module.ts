import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { ChatsGateway } from 'src/chats/chats.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsModel } from 'src/chats/entity/chats.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([ChatsModel]), CommonModule],
  controllers: [ChatsController],
  providers: [ChatsGateway, ChatsService],
})
export class ChatsModule {}
