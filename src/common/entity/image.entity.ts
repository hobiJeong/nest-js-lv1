import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { join } from 'path';
import { POST_PUBLIC_IMAGE_PATH } from 'src/common/const/path.const';
import { BaseModel } from 'src/common/entity/base.entity';
import { PostsModel } from 'src/posts/entity/posts.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

export enum ImageModelType {
  POST_IMAGE,
}

@Entity()
export class ImageModel extends BaseModel {
  @Column({
    default: 0,
    comment: '이미지의 순서',
  })
  @IsInt()
  @IsOptional()
  order: number;

  // UsersModel -> 사용자 프로필 이미지
  // PostsModel -> 포스트 이미지
  @Column({
    enum: ImageModelType,
  })
  @IsEnum(ImageModelType)
  @IsString()
  type: ImageModelType;

  @Column()
  @IsString()
  @Transform(({ value, obj }) => {
    if (obj.type === ImageModelType.POST_IMAGE) {
      return `/${join(POST_PUBLIC_IMAGE_PATH, value)}`;
    } else {
      return value;
    }
  })
  path: string;

  @ManyToOne((type) => PostsModel, (post) => post.images, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  post?: PostsModel;
}
