import { AggregateID } from '@libs/ddd/entity.base';
import { Prisma, User } from '@prisma/client';
import { ImageEntity } from '@src/apis/image/domain/images.entity';

export interface PostProps {
  userId: AggregateID;

  title: string;
  content: string;
  likeCount: number;
  commentCount: number;

  user?: User;
  images?: ImageEntity[];
  comments?: Comment[];
}

const postWithAuthorAndImages = Prisma.validator<Prisma.PostDefaultArgs>()({
  include: {
    images: true,
    user: true,
  },
});

export type PostWithAuthorAndImages = Prisma.PostGetPayload<
  typeof postWithAuthorAndImages
>;
