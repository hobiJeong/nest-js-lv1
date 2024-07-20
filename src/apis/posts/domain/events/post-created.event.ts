import { DomainEvent, DomainEventProps } from '@libs/ddd/base-domain.event';
import { AggregateID } from '@libs/ddd/entity.base';

export class PostCreatedEvent extends DomainEvent {
  readonly userId: AggregateID;

  readonly title: string;
  readonly content: string;
  readonly likeCount: number;
  readonly commentCount: number;

  constructor(props: DomainEventProps<PostCreatedEvent>) {
    super(props);

    const { userId, title, content, likeCount, commentCount } = props;

    this.userId = userId;
    this.title = title;
    this.content = content;
    this.likeCount = likeCount;
    this.commentCount = commentCount;
  }
}
