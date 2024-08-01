import { AggregateID } from '@libs/ddd/entity.base';
import { ImageType } from '@src/apis/image/const/image.const';
import { ValueOf } from '@src/common/types/common.type';

export interface ImageProps extends CreateImageProps {}

export interface CreateImageProps {
  postId: AggregateID;

  order: number;
  type: ValueOf<typeof ImageType>;
  path: string;
}
