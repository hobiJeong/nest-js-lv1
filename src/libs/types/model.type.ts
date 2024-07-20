import { Prisma } from '@prisma/client';
import {
  DynamicModelExtensionThis,
  InternalArgs,
} from '@prisma/client/runtime/library';
import {
  Paginator,
  PaginatorOptions,
} from 'prisma-extension-pagination/dist/extension';

export type ModelNames =
  | 'ChatRoom'
  | 'Comment'
  | 'Image'
  | 'Message'
  | 'Post'
  | 'Follow'
  | 'User'
  | 'ChatUser';

export type ExtendedModel<T extends ModelNames> = DynamicModelExtensionThis<
  Prisma.TypeMap<
    InternalArgs & {
      result: Record<string, any>;
      model: {
        $allModels: {
          paginate: () => Paginator<PaginatorOptions>;
        };
        chat: {
          paginate: () => Paginator<PaginatorOptions>;
        };
        comment: {
          paginate: () => Paginator<PaginatorOptions>;
        };
        image: {
          paginate: () => Paginator<PaginatorOptions>;
        };
        message: {
          paginate: () => Paginator<PaginatorOptions>;
        };
        post: {
          paginate: () => Paginator<PaginatorOptions>;
        };
        follow: {
          paginate: () => Paginator<PaginatorOptions>;
        };
        user: {
          paginate: () => Paginator<PaginatorOptions>;
        };
        chatUser: {
          paginate: () => Paginator<PaginatorOptions>;
        };
      };
      query: Record<string, any>;
      client: Record<string, any>;
    }
  >,
  T,
  {
    result: Record<string, any>;
    model: {
      $allModels: {
        paginate: () => Paginator<PaginatorOptions>;
      };
      chat: {
        paginate: () => Paginator<PaginatorOptions>;
      };
      comment: {
        paginate: () => Paginator<PaginatorOptions>;
      };
      image: {
        paginate: () => Paginator<PaginatorOptions>;
      };
      message: {
        paginate: () => Paginator<PaginatorOptions>;
      };
      post: {
        paginate: () => Paginator<PaginatorOptions>;
      };
      follow: {
        paginate: () => Paginator<PaginatorOptions>;
      };
      user: {
        paginate: () => Paginator<PaginatorOptions>;
      };
      chatUser: {
        paginate: () => Paginator<PaginatorOptions>;
      };
    };
  }
>;

export type ChatRoomDelegate = ExtendedModel<'ChatRoom'>;
export type CommentDelegate = ExtendedModel<'Comment'>;
export type ImageDelegate = ExtendedModel<'Image'>;
export type MessageDelegate = ExtendedModel<'Message'>;
export type PostDelegate = ExtendedModel<'Post'>;
export type FollowDelegate = ExtendedModel<'Follow'>;
export type UserDelegate = ExtendedModel<'User'>;
export type ChatUserDelegate = ExtendedModel<'ChatUser'>;

export type ModelDelegate =
  | ChatRoomDelegate
  | CommentDelegate
  | ImageDelegate
  | MessageDelegate
  | PostDelegate
  | FollowDelegate
  | UserDelegate
  | ChatUserDelegate;
