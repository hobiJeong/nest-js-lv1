import { BaseRepository } from '@libs/db/base.repository';
import { Inject, Injectable } from '@nestjs/common';
import { CustomPrismaClient } from 'src/prisma/types/type';
import { PostEntity } from '@modules/posts/domain/post.entity';
import { CUSTOM_PRISMA_CLIENT } from '@src/prisma/prisma.module';
import { EventBus } from '@nestjs/cqrs';
import { ExtendedModel } from '@libs/types/model.type';
import { PostMapper, PostModel } from '@modules/posts/mappers/post.mapper';
import { PostsRepositoryPort } from '@modules/posts/repositories/posts.repository-port';
import { AggregateID } from '@libs/ddd/entity.base';

@Injectable()
export class PostsRepository
  extends BaseRepository<PostEntity, PostModel>
  implements PostsRepositoryPort
{
  private readonly postModel: ExtendedModel<'Post'>;

  constructor(
    @Inject(CUSTOM_PRISMA_CLIENT)
    client: CustomPrismaClient,
    eventBus: EventBus,
    postMapper: PostMapper,
  ) {
    const postModel: ExtendedModel<'Post'> = client.post;

    super(postModel, postMapper, eventBus);
    this.postModel = postModel;
  }

  async findOneById(id: AggregateID): Promise<PostEntity | undefined> {
    const post = await this.postModel.findUnique({
      where: {
        id,
      },
    });

    return post ? this.mapper.toEntity(post) : undefined;
  }

  async findOneByIdAndUserId(
    id: AggregateID,
    userId: AggregateID,
  ): Promise<PostEntity | undefined> {
    const post = await this.postModel.findUnique({
      where: {
        id,
        userId,
      },
    });

    return post ? this.mapper.toEntity(post) : undefined;
  }
}
