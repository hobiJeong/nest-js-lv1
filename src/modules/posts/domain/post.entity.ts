import { AggregateRoot } from '@libs/ddd/aggregate-root.base';
import { ImageType } from '@modules/images/const/image.const';
import { ImageEntity } from '@modules/images/domain/image.entity';
import { PostCreatedDomainEvent } from '@modules/posts/domain/events/post-created.event';
import {
  PostProps,
  CreatePostProps,
} from '@modules/posts/domain/post.entity-interface';
import { getTsid } from 'tsid-ts';

export class PostEntity extends AggregateRoot<PostProps> {
  static create(create: CreatePostProps): PostEntity {
    const id = getTsid().toBigInt();

    const { imagePaths, ...createProps } = create;

    const props: PostProps = {
      ...createProps,
      likeCount: 0,
      commentCount: 0,
      deletedAt: null,
      user: null,
      images: imagePaths.map((path, index) =>
        ImageEntity.create({
          postId: id,
          order: index,
          type: ImageType.POST_IMAGE,
          path,
        }),
      ),
    };

    const post = new PostEntity({ id, props });

    post.addEvent(
      new PostCreatedDomainEvent({
        aggregateId: id,
        ...props,
      }),
    );

    return post;
  }

  private updateCountColumn(
    column: keyof Pick<PostProps, 'commentCount' | 'likeCount'>,
    increment: boolean,
  ) {
    increment ? this.props[column]++ : this.props[column]--;
  }

  incrementLikeCount() {
    this.updateCountColumn('likeCount', true);
  }
  decrementLikeCount() {
    this.updateCountColumn('likeCount', false);
  }
  incrementCommentCount() {
    this.updateCountColumn('commentCount', true);
  }
  decrementCommentCount() {
    this.updateCountColumn('commentCount', false);
  }

  private appendImages(imagePaths: string[] | []) {
    const images = imagePaths.map((path, index) =>
      ImageEntity.create({
        postId: this.id,
        order: index,
        type: ImageType.POST_IMAGE,
        path,
      }),
    );

    this.setImages(images);
  }

  private setImages(images: ImageEntity[] | []) {
    this.props.images = images;
  }

  public validate(): void {}
}
