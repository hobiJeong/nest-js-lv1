import { BaseModel } from '@libs/db/base.model';
import { AggregateID } from '@libs/ddd/entity.base';
import { Mapper } from '@libs/ddd/mapper.interface';
import { ObjectLiteral } from '@libs/types/object-literal.type';
import { ImageType } from '@prisma/client';
import { ImageEntity } from '@src/apis/image/domain/image.entity';
import { ImageResponseDto } from '@src/apis/image/dto/response/image.response-dto';

export class ImageModel extends BaseModel implements ObjectLiteral {
  [key: string]: unknown;

  readonly postId: AggregateID;

  readonly order: number;
  readonly type: ImageType;
  readonly path: string;

  constructor(create: ImageModel) {
    super(create);

    const { postId, order, type, path } = create;

    this.postId = postId;
    this.order = order;
    this.type = type;
    this.path = path;
  }
}

export class ImageMapper
  implements Mapper<ImageEntity, ImageModel, ImageResponseDto>
{
  toPersistence(entity: ImageEntity): ImageModel {
    const props = entity.getProps();

    return new ImageModel(props);
  }

  toEntity(record: ImageModel): ImageEntity {
    return new ImageEntity({});
  }

  toResponseDto(entity: ImageEntity): ImageResponseDto {}
}
