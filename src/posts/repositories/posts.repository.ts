import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
  ) {}

  create(authorId: number, dto: CreatePostDto) {
    const { images, ...postProps } = dto;

    return this.txHost.tx.postsModel.create({
      data: {
        authorId,
        ...postProps,
        likeCount: 0,
        commentCount: 0,
      },
    });
  }
}
