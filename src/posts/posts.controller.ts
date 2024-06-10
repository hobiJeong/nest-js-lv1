import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { AccessTokenGuard } from 'src/auth/guard/bearer-token.guard';
import { User } from 'src/users/decorator/user.decorator';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { UpdatePostDto } from 'src/posts/dto/update-post.dto';

/**
 * author: string;
 * title: string;
 * content: string;
 * likeCount: number;
 * commentCount: number;
 */

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 1) GET /posts
  //     모든 post를 다 가져온다
  @Get()
  getPosts() {
    return this.postsService.getAllPosts();
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
  @Post()
  @UseGuards(AccessTokenGuard)
  postPosts(@User('id') userId: number, @Body() body: CreatePostDto) {
    return this.postsService.createPost(userId, body);
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
