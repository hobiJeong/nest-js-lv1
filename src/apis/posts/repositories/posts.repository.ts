import { BaseRepository } from '@libs/db/base.repository';
import { Inject, Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { CreatePostDto } from '@src/apis/posts/dto/requests/create-post.dto';
import { PostCountColumn } from '@src/apis/posts/const/post.enum';
import { CustomPrismaClient } from 'src/prisma/types/type';
import { getTsid } from 'tsid-ts';
import { PostEntity } from '@src/apis/posts/domain/post.entity';
import { CUSTOM_PRISMA_CLIENT } from '@src/prisma/prisma.module';
import { EventBus } from '@nestjs/cqrs';
import { ExtendedModel } from '@libs/types/model.type';
import { PostMapper, PostModel } from '@src/apis/posts/mappers/post.mapper';
import { PostsRepositoryPort } from '@src/apis/posts/repositories/posts.repository-port';

@Injectable()
export class PostsRepository
  extends BaseRepository<PostEntity, PostModel>
  implements PostsRepositoryPort
{
  constructor(
    @Inject(CUSTOM_PRISMA_CLIENT)
    private readonly client: CustomPrismaClient,
    private readonly eventBus: EventBus,
    private readonly postMapper: PostMapper,
  ) {
    const postModel: ExtendedModel<'Post'> = client.post;

    super(postModel, postMapper, eventBus);
  }

  async create(dto: CreatePostDto) {
    this.client.post.create({
      data: {
        user: {
          c,
        },
      },
    });

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
