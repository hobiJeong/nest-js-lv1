import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateChatDto } from 'src/chats/dto/create-chat.dto';
import { PaginateChatDto } from 'src/chats/dto/paginate-chat.dto';
import { ChatsModel } from 'src/chats/entity/chats.entity';
import { CommonService } from 'src/common/common.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Repository } from 'typeorm';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(ChatsModel)
    private readonly chatsRepository: Repository<ChatsModel>,
    private readonly commonService: CommonService,
    private readonly prisma: PrismaService,
  ) {}

  async paginateChats(dto: PaginateChatDto) {
    return this.commonService.paginate(
      dto,
      this.prisma.client.chatsModel,
      'chats',
    );
  }

  async createChat(dto: CreateChatDto) {
    const chat = await this.chatsRepository.save({
      users: dto.userIds.map((id) => ({
        id,
      })),
    });

    return this.chatsRepository.findOne({
      where: {
        id: chat.id,
      },
    });
  }

  async checkIfChatExists(chatId: number) {
    const exists = await this.chatsRepository.existsBy({
      id: chatId,
    });

    return exists;
  }
}
