import { routesV1 } from '@config/app.route';
import { PostEntity } from '@modules/posts/domain/post.entity';
import { PostResponseDto } from '@modules/posts/dto/responses/post.response-dto';
import { PostMapper } from '@modules/posts/mappers/post.mapper';
import { FindOnePostQuery } from '@modules/posts/queries/find-one-post/find-one-post.query';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

@Controller(routesV1.version)
export class FindOnePostController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly mapper: PostMapper,
  ) {}

  @Get(routesV1.post.findOne)
  async findOne(
    @Param('id', ParseIntPipe) id: bigint,
  ): Promise<PostResponseDto> {
    const query = new FindOnePostQuery({ id });

    const post: PostEntity = await this.queryBus.execute(query);

    return this.mapper.toResponseDto(post);
  }
}
