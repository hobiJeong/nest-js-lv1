import { Injectable, NotFoundException } from '@nestjs/common';

import { CommonService } from 'src/common/common.service';
import { PaginatePostDto } from 'src/posts/dto/paginate-post.dto';
import { UpdatePostDto } from 'src/posts/dto/update-post.dto';

import { PrismaService } from 'src/prisma/prisma.service';
import { $Enums, PostsModel, UsersModel } from '@prisma/client';

import { plainToInstance } from 'class-transformer';
import type { PostWithAuthorAndImages } from 'src/posts/type/post.type';
import { PostImageModel } from 'src/common/entity/image.model';
import { PostsPaginateFindManyArgs } from 'src/common/const/find-many-args.type';
import { PostsImagesService } from 'src/posts/image/services/images.service';
import { CreatePostAndImagesDto } from 'src/posts/dto/create-post-and-images.dto';
import { PostsRepository } from 'src/posts/repositories/posts.repository';
import { Transactional } from '@nestjs-cls/transactional';
import { PostCountColumn } from 'src/posts/const/post.enum';

@Injectable()
export class PostsService {
  constructor(
    private readonly commonService: CommonService,
    private readonly prisma: PrismaService,
    private readonly postsImagesService: PostsImagesService,
    private readonly postsRepository: PostsRepository,
  ) {}

  async generatePosts(userId: number) {
    for (let i = 0; i < 100; i++) {
      await this.createPost(userId, {
        title: `임의로 생성된 포스트 제목 ${i}`,
        content: `임의로 생서된 포스트 내용 ${i}`,
        images: [],
      });
    }
  }

  async paginatePosts(dto: PaginatePostDto) {
    return this.commonService.paginate<
      PaginatePostDto,
      PostsModel,
      PostsPaginateFindManyArgs
    >(dto, this.prisma.client.postsModel, 'posts', {
      include: { author: true, imageModel: true },
    });
  }

  async getPostById(id: number): Promise<PostsModel> {
    const post = await this.postsRepository.findUniqueById(id, {
      include: {
        author: true,
      },
    });

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  @Transactional()
  incrementCommentCount(postId: number) {
    return this.postsRepository.increment(postId, PostCountColumn.CommentCount);
  }

  @Transactional()
  decrementCommentCount(postId: number) {
    return this.postsRepository.decrement(postId, PostCountColumn.LikeCount);
  }

  @Transactional()
  async createPost(
    authorId: number,
    postDto: CreatePostAndImagesDto,
  ): Promise<PostWithAuthorAndImages> {
    const { images, ...postProps } = postDto;

    const newPost = await this.postsRepository.create({
      authorId,
      ...postProps,
    });

    const imagesModel: PostImageModel[] = [];

    if (images.length) {
      await Promise.all(
        images.map(async (el, index) => {
          const image = await this.postsImagesService.createPostImage({
            postId: newPost.id,
            order: index,
            path: postDto.images[index],
            type: $Enums.ImageType.POST,
          });

          imagesModel.push(plainToInstance(PostImageModel, image));
        }),
      );
    }

    newPost['imageModel'] = imagesModel;

    return newPost as PostWithAuthorAndImages;
  }

  async updatePost(postId: number, postDto: UpdatePostDto) {
    const { title, content } = postDto;

    const post = await this.postsRepository.findUniqueById(postId);

    if (!post) {
      throw new NotFoundException();
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    return this.postsRepository.update({
      ...post,
    });
  }

  async deletePost(postId: number) {
    const post = await this.postsRepository.findUniqueById(postId);

    if (!post) {
      throw new NotFoundException();
    }

    await this.prisma.chatsModel.delete({ where: { id: postId } });

    return postId;
  }

  checkPostExistsById(id: number): Promise<PostsModel> {
    return this.postsRepository.findUniqueById(id);
  }

  async isPostMine(
    userId: number,
    postId: number,
  ): Promise<PostsModel & { author: UsersModel }> {
    return this.postsRepository.findUniqueByIdWithAuthor(postId, userId);
  }
}
