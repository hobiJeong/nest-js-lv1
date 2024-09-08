import { NotFoundException } from '@libs/exceptions/exceptions';
import { PostEntity } from '@modules/posts/domain/post.entity';
import { PostMapper } from '@modules/posts/mappers/post.mapper';
import { Inject } from '@nestjs/common';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CUSTOM_PRISMA_CLIENT } from '@src/prisma/prisma.module';
import { CustomPrismaClient } from '@src/prisma/types/type';

export class FindOnePostQuery implements IQuery {
  readonly id: bigint;

  constructor(props: FindOnePostQuery) {
    const { id } = props;

    this.id = id;
  }
}

@QueryHandler(FindOnePostQuery)
export class FindOnePostQueryHandler
  implements IQueryHandler<FindOnePostQuery>
{
  constructor(
    @Inject(CUSTOM_PRISMA_CLIENT)
    private readonly client: CustomPrismaClient,
    private readonly postMapper: PostMapper,
  ) {}

  async execute(query: FindOnePostQuery): Promise<PostEntity> {
    const { id } = query;

    const existPost = await this.client.post.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!existPost) {
      throw new NotFoundException("That post doesn't exist.");
    }

    return this.postMapper.toEntity(existPost);
  }
}
