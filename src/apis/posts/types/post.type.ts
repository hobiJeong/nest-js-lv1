import { AggregateID } from '@libs/ddd/entity.base';
import { CommentEntity } from '@src/apis/comments/entities/comment.entity';
import { ImageEntity } from '@src/apis/image/domain/image.entity';
import { UserEntity } from '@src/apis/users/domain/users.entity';

export interface PostProps {
  userId: AggregateID;

  title: string;
  content: string;
  likeCount: number;
  commentCount: number;

  user?: UserEntity;
  images?: ImageEntity[];
  comments?: CommentEntity[];
}

export interface CreatePostProps {
  userId: AggregateID;

  title: string;
  content: string;

  user?: UserEntity;
  images?: ImageEntity[];
  comments?: CommentEntity[];
}
