import { routesV1 } from '@config/app.route';
import { FindOnePostQuery } from '@modules/posts/queries/find-one-post/find-one-post.query';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

@Controller(routesV1.version)
export class FindOnePostController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(routesV1.post.findOne)
  async findOne(@Param('id', ParseIntPipe) id: bigint) {
    const query = new FindOnePostQuery({ id });

    const post = await this.queryBus.execute(query);
  }
}
