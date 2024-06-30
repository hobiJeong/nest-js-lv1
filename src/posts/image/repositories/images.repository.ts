import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { CreatePostImageDto } from 'src/posts/image/dto/create-image.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsImagesRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
  ) {}

  create(data: CreatePostImageDto) {
    return this.txHost.tx.imageModel.create({
      data,
    });
  }
}
