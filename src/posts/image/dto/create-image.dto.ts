import { $Enums, ImageModel } from '@prisma/client';

export class CreatePostImageDto
  implements Pick<ImageModel, 'postId' | 'order' | 'path' | 'type'>
{
  postId: number;

  order: number;

  path: string;

  type: $Enums.ImageType;
}
