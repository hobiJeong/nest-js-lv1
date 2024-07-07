import { Entity } from '@src/libs/ddd/entity.base';

export abstract class AggregateRoot<EntityProps> extends Entity<EntityProps> {}
