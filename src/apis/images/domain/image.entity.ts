import { Entity } from '@libs/ddd/entity.base';
import { CreateImageProps, ImageProps } from '@src/apis/image/types/image.type';
import { getTsid } from 'tsid-ts';

export class ImageEntity extends Entity<ImageProps> {
  static create(create: CreateImageProps): ImageEntity {
    const id = getTsid().toBigInt();

    const props: ImageProps = {
      ...create,
    };

    return new ImageEntity({ id, props });
  }

  public validate(): void {}
}
