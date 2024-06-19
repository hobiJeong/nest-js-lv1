import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { PaginateCommentsDto } from 'src/posts/comments/dto/paginate-comments.dto';
import { AccessTokenGuard } from 'src/auth/guard/bearer-token.guard';
import { User } from 'src/users/decorator/user.decorator';
import { UsersModel } from 'src/users/entity/users.entity';
import { CreateCommentDto } from 'src/posts/comments/dto/create-comment.dto';
import { UpdateCommentDto } from 'src/posts/comments/dto/update-comment.dto';

@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  getComments(
    @Query() query: PaginateCommentsDto,
    @Param('postId', ParseIntPipe) postId: number,
  ) {
    return this.commentsService.paginateComments(query, postId);
  }

  @Get(':commentId')
  getComment(@Param('commentId', ParseIntPipe) commentId: number) {
    return this.commentsService.getCommentById(commentId);
  }

  @Post()
  @UseGuards(AccessTokenGuard)
  postComment(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() body: CreateCommentDto,
    @User() user: UsersModel,
  ) {
    return this.commentsService.createComment(body, postId, user);
  }

  @Patch(':commentId')
  @UseGuards(AccessTokenGuard)
  async patchComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() body: UpdateCommentDto,
  ) {
    return this.commentsService.updateComment(body, commentId);
  }

  @Delete(':commentId')
  @UseGuards(AccessTokenGuard)
  async deleteComment(@Param('commentId', ParseIntPipe) commentId: number) {
    return this.commentsService.deleteComment(commentId);
  }
}
