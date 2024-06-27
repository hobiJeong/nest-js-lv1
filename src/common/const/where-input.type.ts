import { Prisma } from '@prisma/client';

export type WhereInputType =
  | Prisma.UsersModelWhereInput
  | Prisma.ChatsModelWhereInput
  | Prisma.ImageModelWhereInput
  | Prisma.PostsModelWhereInput
  | Prisma.CommentsModelWhereInput
  | Prisma.MessagesModelWhereInput
  | Prisma.UserFollowersModelWhereInput;
