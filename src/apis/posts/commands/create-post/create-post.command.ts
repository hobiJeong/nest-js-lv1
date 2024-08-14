import { Command, CommandProps } from '@libs/ddd/command.base';
import { ICommand } from '@nestjs/cqrs';

export class CreatePostCommand extends Command implements ICommand {
  readonly title: string;
  readonly content: string;
  readonly userId: bigint;
  readonly images?: string[];

  constructor(props: CommandProps<CreatePostCommand>) {
    super(props);

    const { title, content, userId, images } = props;

    this.title = title;
    this.content = content;
    this.userId = userId;

    if (images) {
      this.images = images;
    }
  }
}
