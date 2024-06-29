import { $Enums } from '@prisma/client';
import { Transform } from 'class-transformer';
import { join } from 'path';
import { POST_PUBLIC_IMAGE_PATH } from 'src/common/const/path.const';
import { BaseModel } from 'src/common/entity/base.model';
import { ImageModelType } from 'src/common/entity/image.entity';

export class PostImageModel extends BaseModel {
  order: number;
  type: $Enums.ImageType = 'POST';
  postId: number;

  @Transform(({ value, obj }) => {
    if (obj.type === ImageModelType.POST_IMAGE) {
      return `/${join(POST_PUBLIC_IMAGE_PATH, value)}`;
    } else {
      return value;
    }
  })
  path: string;
}
