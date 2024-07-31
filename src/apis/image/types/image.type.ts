import { AggregateID } from '@libs/ddd/entity.base';
import { ValueOf } from '@src/common/types/common.type';

export interface ImageProps extends CreateImageProps {}

export interface CreateImageProps {
  postId: AggregateID;

  order: number;
  type: ValueOf<typeof ImageType>;
  path: string;
}

export const ImageType = {
  POST_IMAGE: 'POST_IMAGE',
} as const;
