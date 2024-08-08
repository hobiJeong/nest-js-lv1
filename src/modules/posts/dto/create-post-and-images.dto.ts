import { PickType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsArray } from 'class-validator';
import { PostsModel } from '@src/apis/posts/entity/posts.entity';

// 상속, implements 등등 여러가지 OOP 테크닉들을 사용가능

// Pick, Omit, Partial -> Type 반환
// PickType, OmitType, PartialType -> 값을 반환
export class CreatePostDto extends PickType(PostsModel, ['title', 'content']) {
  @IsArray()
  @IsString({
    each: true,
  })
  @IsOptional()
  images: string[] = [];
}
