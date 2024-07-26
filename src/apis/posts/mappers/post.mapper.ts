import { Mapper } from '@libs/ddd/mapper.interface';
import { Injectable } from '@nestjs/common';
import { PostEntity } from '@src/apis/posts/domain/posts.entity';
import { PostResponseDto } from '@src/apis/posts/dto/responses/post.response-dto';

import { AggregateID } from '@libs/ddd/entity.base';
import { ObjectLiteral } from '@libs/types/object-literal.type';
import { BaseModel } from '@libs/db/base.model';

export class PostModel extends BaseModel implements ObjectLiteral {
  [key: string]: unknown;

  readonly userId: AggregateID;

  readonly title: string;
  readonly content: string;
  readonly likeCount: number;
  readonly commentCount: number;

  constructor(create: PostModel) {
    super(create);

    const { title, content, likeCount, commentCount, userId } = create;

    this.title = title;
    this.content = content;
    this.likeCount = likeCount;
    this.commentCount = commentCount;
    this.userId = userId;
  }
}

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

        user: record.user ? this.userMapper.toEntity(record.user) : undefined,
        images: record.images
          ? this.imageMapper.toEntity(record.images)
          : undefined,
      },
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }

  toPersistence(entity: PostEntity): PostModel {
    const props = entity.getProps();

    return new PostModel({ ...props });
  }

  toResponseDto(entity: PostEntity): PostResponseDto {
    const props = entity.getProps();

    const dto = new PostResponseDto(props);

    return dto;
  }
}
