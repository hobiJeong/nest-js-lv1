import { Entity } from '@libs/ddd/entity.base';
import { CommentProps } from '@src/apis/comments/types/comments.type';

export class CommentEntity extends Entity<CommentProps> {
  public validate(): void {}
}
