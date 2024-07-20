import { BaseRepository } from '@libs/db/base.repository';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { CreatePostDto } from '@src/apis/posts/dto/requests/create-post.dto';
import { PostCountColumn } from '@src/apis/posts/const/post.enum';
import { CustomPrismaClient } from 'src/prisma/types/type';
import { getTsid } from 'tsid-ts';

@Injectable()
export class PostsRepository extends BaseRepository<> {
  constructor(
    private readonly txHost: TransactionHost<
      TransactionalAdapterPrisma<CustomPrismaClient>
    >,
    private readonly client: CustomPrismaClient,
  ) {}

  async create(dto: CreatePostDto) {
    this.client.post.createMany({ data: {} });

    return this.txHost.tx.post.create({
      data: {
        id: getTsid().toBigInt(),
        ...dto,
      },
      include: {
        user: true,
      },
    });
  }

  findUniqueById(
    id: number,
    overrideOptions: Partial<Prisma.PostFindUniqueArgs> = {},
  ) {
    return this.txHost.tx.post.findUnique({
      where: {
        id,
      },
      ...overrideOptions,
    });
  }

  findUniqueByIdWithAuthor(id: number, userId: number) {
    return this.txHost.tx.post.findUnique({
      where: {
        id,
        userId,
      },
      include: {
        user: true,
      },
    });
  }

  update(postEntity: Partial<Post> & Pick<Post, 'id'>) {
    return this.txHost.tx.post.update({
      data: {
        ...postEntity,
      },
      where: {
        id: postEntity.id,
      },
    });
  }

  delete(id: number) {
    return this.txHost.tx.post.delete({
      where: {
        id,
      },
    });
  }

  increment(postId: number, countColumn: PostCountColumn) {
    return this.txHost.tx.post.update({
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
    return this.txHost.tx.post.update({
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
