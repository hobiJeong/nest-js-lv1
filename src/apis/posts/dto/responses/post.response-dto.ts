import {
  BaseResponseDto,
  BaseResponseDtoProps,
} from '@libs/api/base.response-dto';
import { AggregateID } from '@libs/ddd/entity.base';
import { ImageEntity } from '@src/apis/image/domain/image.entity';
import { PostProps } from '@src/apis/posts/types/post.type';
import { UserEntity } from '@src/apis/users/domain/users.entity';

export interface PostResponseDtoProps extends BaseResponseDtoProps {
  readonly userId: AggregateID;

  readonly title: string;
  readonly content: string;
  readonly commentCount: number;
  readonly likeCount: number;

  readonly images?: ImageEntity[];
  readonly user?: UserEntity;
}

export class PostResponseDto extends BaseResponseDto implements PostProps {
  readonly userId: AggregateID;

  readonly title: string;
  readonly content: string;
  readonly commentCount: number;
  readonly likeCount: number;

  readonly images?: ImageEntity[];
  readonly user?: UserEntity;

  constructor(create: PostResponseDtoProps) {
    super(create);

    const { userId, title, content, commentCount, likeCount, images, user } =
      create;

    this.userId = userId;
    this.title = title;
    this.content = content;
    this.commentCount = commentCount;
    this.likeCount = likeCount;

    this.images = images ? images : undefined;
    this.user = user ? user : undefined;
  }
}
