import { Prisma } from '@prisma/client';

export type OrderInputType =
  | Prisma.UsersModelOrderByWithRelationInput
  | Prisma.ChatsModelOrderByWithRelationInput
  | Prisma.ImageModelOrderByWithRelationInput
  | Prisma.PostsModelOrderByWithRelationInput
  | Prisma.CommentsModelOrderByWithRelationInput
  | Prisma.MessagesModelOrderByWithRelationInput
  | Prisma.UserFollowersModelOrderByWithRelationInput;
