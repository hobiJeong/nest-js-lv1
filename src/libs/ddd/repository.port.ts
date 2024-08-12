/*  Most of repositories will probably need generic 
    save/find/delete operations, so it's easier
    to have some shared interfaces.
    More specific queries should be defined
    in a respective repository.
*/

import { AggregateID } from '@libs/ddd/entity.base';
import { SortOrder } from '@src/common/const/sort-order.enum';

export class Paginated<T> {
  readonly count: number;
  readonly limit: number;
  readonly page: number;
  readonly data: readonly T[];

  constructor(props: Paginated<T>) {
    this.count = props.count;
    this.limit = props.limit;
    this.page = props.page;
    this.data = props.data;
  }
}

export type OrderBy<T> = Partial<Record<keyof T, SortOrder>>[];

export type PaginatedQueryParams<T, Filter> = {
  limit: number;
  page: number;
  orderBy: OrderBy<T>;
  filter: Filter;
};

export interface RepositoryPort<Entity> {
  insert(entity: Entity | Entity[]): Promise<void>;
  findOneById(id: bigint): Promise<Entity | undefined>;
  findAll(): Promise<Entity[]>;
  update(entity: Entity): Promise<Entity>;
  delete(entity: Entity): Promise<AggregateID>;
}
