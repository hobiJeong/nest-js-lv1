import { AggregateID } from '@libs/ddd/entity.base';
import { UserEntity } from '@modules/users/domain/users.entity';

export interface CommentProps {
  userId: AggregateID;
  postId: AggregateID;

  comment: string;
  likeCount: number;

  user?: UserEntity;
}

export interface CommentProps {
  userId: AggregateID;
  postId: AggregateID;

  comment: string;

  user?: UserEntity;
}
