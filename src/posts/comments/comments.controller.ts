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
  UseInterceptors,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { PaginateCommentsDto } from 'src/posts/comments/dto/paginate-comments.dto';
import { User } from 'src/users/decorator/user.decorator';
import { UsersModel } from 'src/users/entity/users.entity';
import { CreateCommentDto } from 'src/posts/comments/dto/create-comment.dto';
import { UpdateCommentDto } from 'src/posts/comments/dto/update-comment.dto';
import { IsPublic } from 'src/common/decorator/is-public.decorator';
import {
  IsMineOrAdminGuard,
  SetParamsToken,
} from 'src/common/guard/is-mine-or-admin.guard';
import { QR } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner } from 'typeorm';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { PostsService } from 'src/posts/posts.service';

@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly postsService: PostsService,
  ) {}

  @Get()
  @IsPublic()
  getComments(
    @Query() query: PaginateCommentsDto,
    @Param('postId', ParseIntPipe) postId: number,
  ) {
    return this.commentsService.paginateComments(query, postId);
  }

  @Get(':commentId')
  @IsPublic()
  getComment(@Param('commentId', ParseIntPipe) commentId: number) {
    return this.commentsService.getCommentById(commentId);
  }

  @Post()
  @UseInterceptors(TransactionInterceptor)
  async postComment(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() body: CreateCommentDto,
    @User() user: UsersModel,
    @QR() queryRunner: QueryRunner,
  ) {
    const resp = await this.commentsService.createComment(
      body,
      postId,
      user,
      queryRunner,
    );

    await this.postsService.incrementCommentCount(postId, queryRunner);

    return resp;
  }

  @Patch(':commentId')
  @SetParamsToken('commentId')
  @UseGuards(IsMineOrAdminGuard<CommentsService>)
  async patchComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() body: UpdateCommentDto,
  ) {
    return this.commentsService.updateComment(body, commentId);
  }

  @Delete(':commentId')
  @UseInterceptors(TransactionInterceptor)
  @SetParamsToken('commentId')
  @UseGuards(IsMineOrAdminGuard<CommentsService>)
  async deleteComment(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @QR() queryRunner: QueryRunner,
  ) {
    const res = await this.commentsService.deleteComment(
      commentId,
      queryRunner,
    );

    await this.postsService.decrementCommentCount(postId);

    return res;
  }
}
