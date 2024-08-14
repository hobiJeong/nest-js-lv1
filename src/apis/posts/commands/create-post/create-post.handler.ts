import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePostCommand } from '@src/apis/posts/commands/create-post/create-post.command';
import { POST_REPOSITORY_TOKEN } from '@src/apis/posts/tokens/di.token';

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
    constructor(
        @Inject(POST_REPOSITORY_TOKEN) postsRepository: PostsRepositoryPort
    ) {}

    execute(command: CreatePostCommand): Promise<any> {
        const { title, content, userId, images } = command;

        const entity = UserEntity.create({title, content, userId});
    }
}

