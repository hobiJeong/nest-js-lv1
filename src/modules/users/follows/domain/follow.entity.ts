import { AggregateID, Entity } from '@libs/ddd/entity.base';
import { FollowProps } from '@modules/users/follows/types/follows.type';

export class FollowEntity extends Entity<FollowProps> {
  protected _id: AggregateID;

  public validate(): void {}
}
