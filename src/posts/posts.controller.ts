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
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { AccessTokenGuard } from 'src/auth/guard/bearer-token.guard';
import { User } from 'src/users/decorator/user.decorator';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { UpdatePostDto } from 'src/posts/dto/update-post.dto';
import { PaginatePostDto } from 'src/posts/dto/paginate-post.dto';
import { UsersModel } from 'src/users/entities/users.entity';
import { ImageModelType } from 'src/common/entity/image.entity';
import { DataSource, QueryRunner } from 'typeorm';
import { PostsImagesService } from 'src/posts/image/images.service';
import { LogInterceptor } from 'src/common/interceptor/log.interceptor';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { QR } from 'src/common/decorator/query-runner.decorator';
import { HttpExceptionFilter } from 'src/common/exception-filter/http.exception-filter';

/**
 * author: string;
 * title: string;
 * content: string;
 * likeCount: number;
 * commentCount: number;
 */

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly postsImagesService: PostsImagesService,
    private readonly dataSource: DataSource,
  ) {}

  // 1) GET /posts
  //     모든 post를 다 가져온다
  @Get()
  @UseInterceptors(LogInterceptor)
  @UseFilters(HttpExceptionFilter)
  getPosts(@Query() query: PaginatePostDto) {
    // return this.postsService.getAllPosts();
    return this.postsService.paginatePosts(query);
  }

  // 2) GET /posts/:id
  //    id에 해당하는 post를 가져온다
  //    예를 들어서 id=1일 경우 id가 1인 포스트를 가져온다.
  @Get(':id')
  getPost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getPostById(id);
  }

  // 3) POST /posts
  //    POST를 생성한다.
  //
  // DTO - Data Transfer Object
  //
  // A Model, B Model
  // Post API -> A 모델을 저장하고, B 모델을 저장한다.
  // await repository.save(a);
  // await repository.save(b);
  //
  //만약에 a를 저장하다가 실패하면 b를 저장하면 안될 경우
  // all or nothing
  //
  // transaction
  // start -> 시작
  // commit -> 저장
  // rollback -> 원상복구
  @Post()
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(TransactionInterceptor)
  async postPosts(
    @User('id') userId: number,
    @QR() qr: QueryRunner,
    @Body() body: CreatePostDto,
  ) {
    const post = await this.postsService.createPost(userId, body, qr);

    for (let i = 0; i < body.images.length; i++) {
      await this.postsImagesService.createPostImage(
        {
          post,
          order: i,
          path: body.images[i],
          type: ImageModelType.POST_IMAGE,
        },
        qr,
      );
    }

    return this.postsService.getPostById(post.id, qr);
  }

  // POST /posts/random
  @Post('random')
  @UseGuards(AccessTokenGuard)
  async postPostsRandom(@User() user: UsersModel) {
    await this.postsService.generatePosts(user.id);

    return true;
  }

  // 4) PATCH /posts/:id
  //    id에 해당하는 POST를 변경한다.
  @Patch(':id')
  putPost(@Param('id', ParseIntPipe) id: number, @Body() body: UpdatePostDto) {
    return this.postsService.updatePost(id, body);
  }

  // 5) DELETE /posts/:id
  //    id에 해당하는 POST를 삭제한다.
  @Delete(':id')
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.deletePost(id);
  }
}
