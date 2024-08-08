import { DomainEvent, DomainEventProps } from '@libs/ddd/base-domain.event';
import { AggregateID } from '@libs/ddd/entity.base';
import { ImageEntity } from '@modules/images/domain/image.entity';

export class PostCreatedDomainEvent extends DomainEvent {
  readonly userId: AggregateID;

  readonly title: string;
  readonly content: string;
  readonly likeCount: number;
  readonly commentCount: number;

  readonly images: ImageEntity[] | [];

  constructor(props: DomainEventProps<PostCreatedDomainEvent>) {
    super(props);

    const { userId, title, content, likeCount, commentCount, images } = props;

    this.userId = userId;
    this.title = title;
    this.content = content;
    this.likeCount = likeCount;
    this.commentCount = commentCount;
    this.images = images;
  }
}
