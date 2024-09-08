import { EventHandler, IEventHandler } from '@nestjs/cqrs';
import { PostCreatedEvent } from '@src/apis/domain/events/post-created.event';

@EventHandler(PostCreatedEvent)
export class PostCreatedHandler implements IEventHandler<PostCreatedEvent> {
  execute(event: PostCreatedEvent) {}
}
