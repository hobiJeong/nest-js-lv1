import { ObjectLiteral } from '@libs/types/object-literal.type';

export class PostsModel implements ObjectLiteral {
  [key: string]: unknown;

  id: bigint;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  userId: bigint;
  createdAt: Date;
  updatedAt: Date;

  constructor(create: PostsModel) {
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
