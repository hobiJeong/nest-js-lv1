import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { PostsModel, Prisma } from '@prisma/client';
import { PostCountColumn } from 'src/posts/const/post.enum';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { CustomPrismaClient } from 'src/prisma/types/type';

@Injectable()
export class PostsRepository {
  constructor(
    private readonly txHost: TransactionHost<
      TransactionalAdapterPrisma<CustomPrismaClient>
    >,
  ) {}

  async create(dto: CreatePostDto) {
    return this.txHost.tx.postsModel.create({
      data: {
        ...dto,
        likeCount: 0,
        commentCount: 0,
      },
      include: { author: true },
    });
  }

  findUniqueById(
    id: number,
    overrideOptions: Partial<Prisma.PostsModelFindUniqueArgs> = {},
  ) {
    return this.txHost.tx.postsModel.findUnique({
      where: {
        id,
      },
      ...overrideOptions,
    });
  }

  findUniqueByIdWithAuthor(id: number, authorId: number) {
    return this.txHost.tx.postsModel.findUnique({
      where: {
        id,
        authorId,
      },
      include: {
        author: true,
      },
    });
  }

  update(postEntity: Partial<PostsModel> & Pick<PostsModel, 'id'>) {
    return this.txHost.tx.postsModel.update({
      data: {
        ...postEntity,
      },
      where: {
        id: postEntity.id,
      },
    });
  }

  delete(id: number) {
    return this.txHost.tx.postsModel.delete({
      where: {
        id,
      },
    });
  }

  increment(postId: number, countColumn: PostCountColumn) {
    return this.txHost.tx.postsModel.update({
      where: {
        id: postId,
      },
      data: {
        [countColumn]: {
          increment: 1,
        },
      },
    });
  }

  decrement(postId: number, countColumn: PostCountColumn) {
    return this.txHost.tx.postsModel.update({
      where: {
        id: postId,
      },
      data: {
        [countColumn]: {
          decrement: 1,
        },
      },
    });
  }
}
