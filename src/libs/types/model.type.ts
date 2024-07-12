import { Prisma } from '@prisma/client';
import {
  DynamicModelExtensionThis,
  InternalArgs,
} from '@prisma/client/runtime/library';
import { createPaginator } from 'prisma-extension-pagination/dist/extension';

const paginate = createPaginator();

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
          paginate: () => typeof paginate;
        };
        chatRoom: {
          paginate: () => typeof paginate;
        };
        comment: {
          paginate: () => typeof paginate;
        };
        image: {
          paginate: () => typeof paginate;
        };
        message: {
          paginate: () => typeof paginate;
        };
        post: {
          paginate: () => typeof paginate;
        };
        follow: {
          paginate: () => typeof paginate;
        };
        user: {
          paginate: () => typeof paginate;
        };
        chatUser: {
          paginate: () => typeof paginate;
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
        paginate: () => typeof paginate;
      };
      chatRoom: {
        paginate: () => typeof paginate;
      };
      comment: {
        paginate: () => typeof paginate;
      };
      image: {
        paginate: () => typeof paginate;
      };
      message: {
        paginate: () => typeof paginate;
      };
      post: {
        paginate: () => typeof paginate;
      };
      follow: {
        paginate: () => typeof paginate;
      };
      user: {
        paginate: () => typeof paginate;
      };
      chatUser: {
        paginate: () => typeof paginate;
      };
    };
  }
>;
