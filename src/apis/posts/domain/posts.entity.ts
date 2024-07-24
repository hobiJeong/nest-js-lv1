import { AggregateRoot } from '@libs/ddd/aggregate-root.base';
import { PostCreatedDomainEvent } from '@src/apis/posts/domain/events/post-created.event';
import { CreatePostProps, PostProps } from '@src/apis/posts/types/post.type';
import { getTsid } from 'tsid-ts';

export class PostEntity extends AggregateRoot<PostProps> {
  static create(create: CreatePostProps) {
    const id = getTsid().toBigInt();

    const props: PostProps = {
      ...create,
      likeCount: 0,
      commentCount: 0,
    };
    const post = new PostEntity({ id, props });

    post.addEvent(
      new PostCreatedDomainEvent({
        aggregateId: id,
        ...props,
      }),
    );
  }

  public validate(): void {}
}
