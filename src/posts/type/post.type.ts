import { Prisma } from '@prisma/client';

const postWithAuthorAndImages =
  Prisma.validator<Prisma.PostsModelDefaultArgs>()({
    include: {
      imageModel: true,
      author: true,
    },
  });

export type PostWithAuthorAndImages = Prisma.PostsModelGetPayload<
  typeof postWithAuthorAndImages
>;
