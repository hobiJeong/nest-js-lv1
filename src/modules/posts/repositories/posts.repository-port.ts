import { AggregateID } from '@libs/ddd/entity.base';
import { RepositoryPort } from '@libs/ddd/repository.port';
import { PostEntity } from '@modules/posts/domain/post.entity';

export interface PostsRepositoryPort extends RepositoryPort<PostEntity> {
  findOneById: (id: AggregateID) => Promise<PostEntity | undefined>;
  findOneByIdAndUserId: (
    id: AggregateID,
    userId: AggregateID,
  ) => Promise<PostEntity | undefined>;
}
