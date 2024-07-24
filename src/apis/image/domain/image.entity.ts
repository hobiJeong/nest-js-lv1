import { Entity } from '@libs/ddd/entity.base';
import { ImageProps } from '@src/apis/image/types/image.type';

export class ImageEntity extends Entity<ImageProps> {
  public validate(): void {}
}
