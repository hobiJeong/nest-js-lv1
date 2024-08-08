import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { PostsModel as PostEntity } from '@src/apis/posts/entity/posts.entity';
import { PostsModel } from '@src/apis/posts/entity/post.model';

// 상속, implements 등등 여러가지 OOP 테크닉들을 사용가능

// Pick, Omit, Partial -> Type 반환
// PickType, OmitType, PartialType -> 값을 반환
export class CreatePostDto extends IntersectionType(
  PickType(PostEntity, ['title', 'content']),
  PickType(PostsModel, ['userId']),
) {}
