import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessagesDto } from 'src/chats/messages/dto/create-messages.dto';
import { MessagesModel } from 'src/chats/messages/entity/messages.entity';
import { CommonService } from 'src/common/common.service';
import { BasePaginationDto } from 'src/common/dto/base-pagination.dto';
import { CUSTOM_PRISMA_CLIENT } from 'src/prisma/prisma.module';
import { CustomPrismaClient } from 'src/prisma/types/type';
import { Repository } from 'typeorm';

@Injectable()
export class ChatsMessagesService {
  constructor(
    @InjectRepository(MessagesModel)
    private readonly messagesRepository: Repository<MessagesModel>,
    private readonly commonService: CommonService,
    @Inject(CUSTOM_PRISMA_CLIENT) private readonly prisma: CustomPrismaClient,
  ) {}

  async createMessage(dto: CreateMessagesDto, authorId: number) {
    const message = await this.messagesRepository.save({
      chat: {
        id: dto.chatId,
      },
      author: {
        id: authorId,
      },
      message: dto.message,
    });

    return this.messagesRepository.findOne({
      where: {
        id: message.id,
      },
      relations: {
        chat: true,
      },
    });
  }

  paginateMessages(dto: BasePaginationDto) {
    return this.commonService.paginate(
      dto,
      this.prisma.messagesModel,
      'messages',
    );
  }
}
