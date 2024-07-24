import { BaseResponse, BaseResponseProps } from '@libs/api/base.response-dto';
import { AggregateID } from '@libs/ddd/entity.base';
import { CommentEntity } from '@src/apis/comments/entities/comment.entity';
import { ImageEntity } from '@src/apis/image/domain/image.entity';
import { PostProps } from '@src/apis/posts/types/post.type';
import { UserEntity } from '@src/apis/users/domain/users.entity';

export interface PostResponseDtoProps extends BaseResponseProps {
  userId: AggregateID;

  title: string;
  content: string;
  commentCount: number;
  likeCount: number;

  comments?: CommentEntity[] | undefined;
  images?: ImageEntity[] | undefined;
  user?: UserEntity | undefined;
}

export class PostResponseDto extends BaseResponse implements PostProps {
  readonly userId: AggregateID;

  readonly title: string;
  readonly content: string;
  readonly commentCount: number;
  readonly likeCount: number;

  readonly comments?: CommentEntity[] | undefined;
  readonly images?: ImageEntity[] | undefined;
  readonly user?: UserEntity | undefined;

  constructor(create: PostResponseDtoProps) {
    super(create);

    const {
      userId,
      title,
      content,
      commentCount,
      likeCount,
      comments,
      images,
      user,
    } = create;

    this.userId = userId;
    this.title = title;
    this.content = content;
    this.commentCount = commentCount;
    this.likeCount = likeCount;

    this.comments = comments ? comments : undefined;
    this.images = images ? images : undefined;
    this.user = user ? user : undefined;
  }
}
