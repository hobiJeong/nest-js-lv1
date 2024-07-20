import { AggregateID } from '@libs/ddd/entity.base';

export interface ImageProps {
  postId: AggregateID;

  order: number;
  type: ImageType;
  path: string;
}

export enum ImageType {
  POST_IMAGE,
}
