export class PostsModel {
  id: bigint;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  userId: bigint;
  createdAt: Date;
  updatedAt: Date;

  constructor() {}
}
