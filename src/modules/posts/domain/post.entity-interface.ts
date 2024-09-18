import { AggregateID } from '@libs/ddd/entity.base';
import { ImageEntity } from '@modules/images/domain/image.entity';
import { UserEntity } from '@modules/users/domain/users.entity';

export interface PostProps {
  userId: AggregateID;

  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  deletedAt: Date | null;

  user: UserEntity | null;
  images: ImageEntity[] | [];
}

export interface CreatePostProps {
  userId: AggregateID;

  title: string;
  content: string;

  imagePaths: string[];
}
