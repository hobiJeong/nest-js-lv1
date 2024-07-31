import { RepositoryPort } from '@libs/ddd/repository.port';
import { PostEntity } from '@src/apis/posts/domain/post.entity';

export interface PostsRepositoryPort extends RepositoryPort<PostEntity> {}
