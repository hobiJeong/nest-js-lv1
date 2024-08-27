import { FindOneQuery } from '@libs/ddd/find-one-query.base';
import { IQuery } from '@nestjs/cqrs';

export class FindOnePostQuery extends FindOneQuery implements IQuery {
  constructor(props: FindOnePostQuery) {
    super(props);
  }
}
