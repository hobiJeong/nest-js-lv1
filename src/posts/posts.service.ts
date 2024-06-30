import { Injectable, NotFoundException } from '@nestjs/common';

import { CommonService } from 'src/common/common.service';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { PaginatePostDto } from 'src/posts/dto/paginate-post.dto';
import { UpdatePostDto } from 'src/posts/dto/update-post.dto';

import { PrismaService } from 'src/prisma/prisma.service';
import { $Enums, PostsModel, Prisma } from '@prisma/client';

import { plainToInstance } from 'class-transformer';
import type { PostWithAuthorAndImages } from 'src/posts/type/post.type';
import { PostImageModel } from 'src/common/entity/image.model';
import { PostsPaginateFindManyArgs } from 'src/common/const/find-many-args.type';
import { PostsImagesService } from 'src/posts/image/services/images.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly commonService: CommonService,
    private readonly prisma: PrismaService,
    private readonly postsImagesService: PostsImagesService,
  ) {}

  getTx(
    tx?: Prisma.TransactionClient,
  ): Prisma.TransactionClient | PrismaService {
    return tx ? tx : this.prisma;
  }

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
    const post = await this.prisma.postsModel.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
      },
    });

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  async incrementCommentCount(postId: number, tx?: Prisma.TransactionClient) {
    const prisma = this.getTx(tx);

    await prisma.postsModel.update({
      where: {
        id: postId,
      },
      data: {
        commentCount: {
          increment: 1,
        },
      },
    });
  }

  async decrementCommentCount(postId: number, tx?: Prisma.TransactionClient) {
    const prisma = this.getTx(tx);

    await prisma.postsModel.update({
      where: {
        id: postId,
      },
      data: {
        commentCount: {
          decrement: 1,
        },
      },
    });
  }

  async createPost(
    authorId: number,
    postDto: CreatePostDto,
  ): Promise<PostWithAuthorAndImages> {
    return this.prisma.$transaction(async (tx) => {
      const { images, ...postProps } = postDto;

      const post = await tx.postsModel.create({
        data: { authorId, ...postProps, likeCount: 0, commentCount: 0 },
        include: { author: true },
      });

      const imagesModel: PostImageModel[] = [];

      if (images.length) {
        for (let i = 0; i < postDto.images.length; i++) {
          const image = await this.postsImagesService.createPostImage(
            {
              postId: post.id,
              order: i,
              path: postDto.images[i],
              type: $Enums.ImageType.POST,
            },
            tx,
          );

          imagesModel.push(plainToInstance(PostImageModel, image));
        }
      }

      post['imageModel'] = imagesModel;

      return post as PostWithAuthorAndImages;
    });
  }

  async updatePost(postId: number, postDto: UpdatePostDto) {
    const { title, content } = postDto;

    /**
     * save의 기능
     * 1) 만약에 데이터가 존재하지 않는다면 (id 기준으로) 새로 생성한다.
     * 2) 만약에 데이터가 존재한다면 (같은 id의 값이 존재한다면) 존재하던 값을 업데이트한다.(save 메서드에 id를 넣으면 조회를 먼저 함)
     */
    const post = await this.prisma.postsModel.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new NotFoundException();
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    const newPost = await this.prisma.chatsModel.update({
      data: { ...post },
      where: { id: post.id },
    });

    return newPost;
  }

  async deletePost(postId: number) {
    const post = await this.prisma.chatsModel.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new NotFoundException();
    }

    await this.prisma.chatsModel.delete({ where: { id: postId } });

    return postId;
  }

  checkPostExistsById(id: number) {
    return this.prisma.chatsModel.findUnique({ where: { id } });
  }

  async isPostMine(userId: number, postId: number) {
    return this.prisma.postsModel.findUnique({
      where: {
        id: postId,
        authorId: userId,
      },
      include: {
        author: true,
      },
    });
  }
}
