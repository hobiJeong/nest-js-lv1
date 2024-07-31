import {
  BaseResponseDto,
  BaseResponseDtoProps,
} from '@libs/api/base.response-dto';
import { AggregateID } from '@libs/ddd/entity.base';
import { ImageProps, ImageType } from '@src/apis/image/types/image.type';
import { POST_PUBLIC_IMAGE_PATH } from '@src/common/const/path.const';
import { Transform } from 'class-transformer';
import { join } from 'path';

export interface ImageResponseDtoProps extends BaseResponseDtoProps {
  readonly postId: AggregateID;

  readonly order: number;
  readonly type: ImageType;
  readonly path: string;
}

export class ImageResponseDto extends BaseResponseDto implements ImageProps {
  readonly postId: AggregateID;

  readonly order: number;
  readonly type: ImageType;

  @Transform(({ value, obj }) => {
    if (obj.type === ImageType.POST_IMAGE) {
      return `/${join(POST_PUBLIC_IMAGE_PATH, value)}`;
    } else {
      return value;
    }
  })
  readonly path: string;

  constructor(create: ImageResponseDtoProps) {
    super(create);

    const { postId, order, type, path } = create;

    this.postId = postId;
    this.order = order;
    this.type = type;
    this.path = path;
  }
}
