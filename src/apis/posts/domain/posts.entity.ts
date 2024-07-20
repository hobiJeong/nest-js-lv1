import { AggregateRoot } from '@libs/ddd/aggregate-root.base';
import { AggregateID } from '@libs/ddd/entity.base';
import { ImageEntity } from '@src/apis/image/domain/images.entity';
import { PostProps } from '@src/apis/posts/type/post.type';

export class PostEntity extends AggregateRoot<PostProps> {
  protected _id: AggregateID;

  title: string;

  content: string;

  likeCount: number;

  commentCount: number;

  author: UsersModel;

  images: ImageEntity[];
  comments: CommentsModel[];

  public validate(): void {}
}
