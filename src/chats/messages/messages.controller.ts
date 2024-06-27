import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ChatsMessagesService } from 'src/chats/messages/messages.service';
import { BasePaginationDto } from 'src/common/dto/base-pagination.dto';

@Controller('chats/:cid/messages')
export class MessagesController {
  constructor(private readonly messagesService: ChatsMessagesService) {}

  @Get()
  paginateMessages(
    @Query() dto: BasePaginationDto,
    @Param('cid', ParseIntPipe) cid: number,
  ) {
    dto['where__chatId'] = cid;

    return this.messagesService.paginateMessages(dto);
  }
}
