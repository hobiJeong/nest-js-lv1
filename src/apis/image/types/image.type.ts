import { AggregateID } from '@libs/ddd/entity.base';

export interface ImageProps extends CreateImageProps {}

export interface CreateImageProps {
  postId: AggregateID;

  order: number;
  type: ImageType;
  path: string;
}

export enum ImageType {
  POST_IMAGE,
}
