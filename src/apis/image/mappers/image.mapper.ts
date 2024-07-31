import { baseSchema } from '@libs/db/base.repository';
import { Mapper } from '@libs/ddd/mapper.interface';
import { ImageEntity } from '@src/apis/image/domain/image.entity';
import { ImageResponseDto } from '@src/apis/image/dto/response/image.response-dto';
import { ImageType } from '@src/apis/image/types/image.type';
import { z } from 'zod';

export const imageSchema = baseSchema.extend({
  postId: z.bigint(),
  order: z.number().int().nonnegative(),
  type: z.nativeEnum(ImageType),
  path: z.string().min(1).max(255),
});

export type ImageModel = z.TypeOf<typeof imageSchema>;

export class ImageMapper
  implements Mapper<ImageEntity, ImageModel, ImageResponseDto>
{
  toPersistence(entity: ImageEntity): ImageModel {
    const props = entity.getProps();

    const record: ImageModel = {
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      postId: props.postId,
      order: props.order,
      type: props.type,
      path: props.path,
    };

    return imageSchema.parse(record);
  }

  toEntity(record: ImageModel): ImageEntity {
    return new ImageEntity({
      id: record.id,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      props: {
        postId: record.postId,
        order: record.order,
        type: record.type,
        path: record.path,
      },
    });
  }

  toResponseDto(entity: ImageEntity): ImageResponseDto {
    const props = entity.getProps();

    return new ImageResponseDto(props);
  }
}
