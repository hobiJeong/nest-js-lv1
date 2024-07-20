import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePostCommand } from '@src/apis/posts/commands/create-post/create-post.command';

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
    constructor(
        @Inject()
    ) {}

    execute(command: CreatePostCommand): Promise<any> {
        
    }
}

