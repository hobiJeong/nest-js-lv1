import { AggregateID } from '@libs/ddd/entity.base';
import { ObjectLiteral } from '@libs/types/object-literal.type';

export class PostModel implements ObjectLiteral {
  [key: string]: unknown;

  readonly id: AggregateID;
  readonly title: string;
  readonly content: string;
  readonly likeCount: number;
  readonly commentCount: number;
  readonly userId: AggregateID;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(create: PostModel) {
    this.id = create.id;
    this.title = create.title;
    this.content = create.content;
    this.likeCount = create.likeCount;
    this.commentCount = create.commentCount;
    this.userId = create.userId;
    this.createdAt = create.createdAt;
    this.updatedAt = create.updatedAt;
  }
}
