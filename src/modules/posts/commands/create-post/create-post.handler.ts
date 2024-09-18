import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePostCommand } from '@modules/posts/commands/create-post/create-post.command';
import { POST_REPOSITORY_TOKEN } from '@modules/posts/tokens/di.token';
import { PostsRepositoryPort } from '@modules/posts/repositories/posts.repository-port';
import { PostEntity } from '@modules/posts/domain/post.entity';

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(
    @Inject(POST_REPOSITORY_TOKEN) postsRepository: PostsRepositoryPort,
  ) {}

  execute(command: CreatePostCommand): Promise<any> {
    const { title, content, userId, images } = command;

    const entity = PostEntity.create({
      title,
      content,
      userId,
      imagePaths: images,
    });

    return this.postsRepository.insert(entity);
  }
}
