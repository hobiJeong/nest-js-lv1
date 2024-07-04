export class PostsModel {
  id: number;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;

  constructor() {}
}
