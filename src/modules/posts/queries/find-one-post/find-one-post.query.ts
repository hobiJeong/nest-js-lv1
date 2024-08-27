import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

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
  execute(query: FindOnePostQuery): Promise<any> {}
}
