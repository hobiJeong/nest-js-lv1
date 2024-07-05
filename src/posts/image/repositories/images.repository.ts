import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Inject, Injectable } from '@nestjs/common';
import { CreatePostImageDto } from 'src/posts/image/dto/create-image.dto';
import { CUSTOM_PRISMA_CLIENT } from 'src/prisma/prisma.module';
import { CustomPrismaClient } from 'src/prisma/types/type';

@Injectable()
export class PostsImagesRepository {
  constructor(
    @Inject(CUSTOM_PRISMA_CLIENT) private readonly prisma: CustomPrismaClient,
    private readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
  ) {}

  create(data: CreatePostImageDto) {
    return this.txHost.tx.imageModel.create({
      data,
    });
  }
}
