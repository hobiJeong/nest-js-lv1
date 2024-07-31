import { AggregateID } from '@libs/ddd/entity.base';
import { ImageEntity } from '@src/apis/image/domain/image.entity';
import { UserEntity } from '@src/apis/users/domain/users.entity';

export interface PostProps {
  userId: AggregateID;

  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  deletedAt: Date | null;

  user?: UserEntity;
  images?: ImageEntity[];
}

export interface CreatePostProps {
  userId: AggregateID;

  title: string;
  content: string;

  imagePaths: string[];
}
