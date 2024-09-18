import {
  BaseResponseDto,
  BaseResponseDtoProps,
} from '@libs/api/base.response-dto';
import { AggregateID } from '@libs/ddd/entity.base';
import { ImageEntity } from '@modules/images/domain/image.entity';
import { PostProps } from '@modules/posts/domain/post.entity-interface';
import { UserEntity } from '@modules/users/domain/users.entity';

export interface PostResponseDtoProps extends BaseResponseDtoProps {
  readonly userId: AggregateID;

  readonly title: string;
  readonly content: string;
  readonly commentCount: number;
  readonly likeCount: number;

  readonly images: ImageEntity[] | [];
  readonly user: UserEntity | null;
}

export class PostResponseDto
  extends BaseResponseDto
  implements Omit<PostProps, 'deletedAt'>
{
  readonly userId: AggregateID;

  readonly title: string;
  readonly content: string;
  readonly commentCount: number;
  readonly likeCount: number;

  readonly images: ImageEntity[] | [];
  readonly user: UserEntity | null;

  constructor(create: PostResponseDtoProps) {
    super(create);

    const { userId, title, content, commentCount, likeCount, images, user } =
      create;

    this.userId = userId;
    this.title = title;
    this.content = content;
    this.commentCount = commentCount;
    this.likeCount = likeCount;

    this.images = images.length ? images : [];
    this.user = user ? user : null;
  }
}
