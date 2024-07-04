import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { PostsModel } from '@prisma/client';
import { PostCountColumn } from 'src/posts/const/post.enum';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
  ) {}

  create(dto: CreatePostDto) {
    return this.txHost.tx.postsModel.create({
      data: {
        ...dto,
        likeCount: 0,
        commentCount: 0,
      },
      include: { author: true },
    });
  }

  findUniqueById(id: number) {
    return this.txHost.tx.postsModel.findUnique({
      where: {
        id,
      },
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
