import { Mapper } from '@libs/ddd/mapper.interface';
import { Injectable } from '@nestjs/common';
import { PostResponseDto } from '@modules/posts/dto/responses/post.response-dto';
import { UserMapper, userSchema } from '@modules/users/mappers/user.mapper';
import { baseSchema } from '@libs/db/base.repository';
import { z } from 'zod';
import { PostEntity } from '@modules/posts/domain/post.entity';
import { ImageMapper, imageSchema } from '@modules/images/mappers/image.mapper';

export const postSchema = baseSchema.extend({
  userId: z.bigint(),

  title: z.string().min(1).max(255),
  content: z.string().min(1),
  likeCount: z.number().int().nonnegative(),
  commentCount: z.number().int().nonnegative(),
  deletedAt: z.preprocess(
    (val: any) => (val === null ? null : new Date(val)),
    z.nullable(z.date()),
  ),

  images: z.array(imageSchema).optional(),
  user: z.optional(userSchema),
});

export type PostModel = z.TypeOf<typeof postSchema>;

@Injectable()
export class PostMapper
  implements Mapper<PostEntity, PostModel, PostResponseDto>
{
  constructor(
    private readonly userMapper: UserMapper,
    private readonly imageMapper: ImageMapper,
  ) {}

  toEntity(record: PostModel): PostEntity {
    return new PostEntity({
      id: record.id,
      props: {
        userId: record.userId,
        title: record.title,
        content: record.content,
        commentCount: record.commentCount,
        likeCount: record.likeCount,
        deletedAt: record.deletedAt,

        user: record.user ? this.userMapper.toEntity(record.user) : null,
        images: record.images?.length
          ? record.images.map((image) => this.imageMapper.toEntity(image))
          : [],
      },
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }

  toPersistence(entity: PostEntity): PostModel {
    const props = entity.getProps();

    const record: PostModel = {
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,

      userId: props.userId,

      title: props.title,
      content: props.content,
      likeCount: props.likeCount,
      commentCount: props.commentCount,
    };

    return postSchema.parse(record);
  }

  toResponseDto(entity: PostEntity): PostResponseDto {
    const props = entity.getProps();

    return new PostResponseDto(props);
  }
}
