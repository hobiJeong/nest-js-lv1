import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateChatDto } from '@modules/chats/dto/create-chat.dto';
import { PaginateChatDto } from '@modules/chats/dto/paginate-chat.dto';
import { ChatsModel } from '@modules/chats/entity/chats.entity';
import { CommonService } from 'src/common/common.service';
import { CUSTOM_PRISMA_CLIENT } from 'src/prisma/prisma.module';
import { CustomPrismaClient } from 'src/prisma/types/type';
import { Repository } from 'typeorm';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(ChatsModel)
    private readonly chatsRepository: Repository<ChatsModel>,
    private readonly commonService: CommonService,
    @Inject(CUSTOM_PRISMA_CLIENT) private readonly prisma: CustomPrismaClient,
  ) {}

  async paginateChats(dto: PaginateChatDto) {
    return this.commonService.paginate(dto, this.prisma.chatsModel, 'chats');
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
