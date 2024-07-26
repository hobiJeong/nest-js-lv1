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
        chatRoom: {
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
      chatRoom: {
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
