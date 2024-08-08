import { IQuery } from '@nestjs/cqrs';

export class FindPostsQuery implements IQuery {
  constructor() {}
}
