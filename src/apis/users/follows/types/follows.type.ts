import { AggregateID } from '@libs/ddd/entity.base';
import { UserEntity } from '@src/apis/users/domain/users.entity';

export interface FollowProps {
  followerId: AggregateID;
  followeeId: AggregateID;

  isConfirmed: boolean;

  followee?: UserEntity;
  follower?: UserEntity;
}
