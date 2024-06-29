import {
  ChatsModel,
  CommentsModel,
  MessagesModel,
  PostsModel,
  Prisma,
  UserFollowersModel,
  UsersModel,
} from '@prisma/client';
import { BaseModel } from 'src/common/entity/base.model';

export type UsersPaginateFindManyArgs = Prisma.Exact<
  Prisma.UsersModelFindManyArgs,
  Omit<Prisma.Args<UsersModel, 'findMany'>, 'cursor' | 'take' | 'skip'>
>;
export type ChatsPaginateFindManyArgs = Prisma.Exact<
  Prisma.ChatsModelFindManyArgs,
  Omit<Prisma.Args<ChatsModel, 'findMany'>, 'cursor' | 'take' | 'skip'>
>;
export type PostsPaginateFindManyArgs = Prisma.Exact<
  Prisma.PostsModelFindManyArgs,
  Omit<Prisma.Args<PostsModel, 'findMany'>, 'cursor' | 'take' | 'skip'>
>;
export type CommentsPaginateFindManyArgs = Prisma.Exact<
  Prisma.CommentsModelFindManyArgs,
  Omit<Prisma.Args<CommentsModel, 'findMany'>, 'cursor' | 'take' | 'skip'>
>;
export type MessagesPaginateFindManyArgs = Prisma.Exact<
  Prisma.MessagesModelFindManyArgs,
  Omit<Prisma.Args<MessagesModel, 'findMany'>, 'cursor' | 'take' | 'skip'>
>;
export type UserFollowersPaginateFindManyArgs = Prisma.Exact<
  Prisma.UserFollowersModelFindManyArgs,
  Omit<Prisma.Args<UserFollowersModel, 'findMany'>, 'cursor' | 'take' | 'skip'>
>;

export type FindManyAggregates =
  | UsersPaginateFindManyArgs
  | ChatsPaginateFindManyArgs
  | CommentsPaginateFindManyArgs
  | PostsPaginateFindManyArgs
  | MessagesPaginateFindManyArgs
  | UserFollowersPaginateFindManyArgs;

export type FindManyArgs<
  A extends FindManyAggregates,
  M extends BaseModel,
> = Prisma.Exact<
  A,
  Omit<Prisma.Args<M, 'findMany'>, 'cursor' | 'take' | 'skip'>
>;
