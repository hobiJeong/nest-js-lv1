import { PickType } from '@nestjs/mapped-types';
import { CommentsModel } from '@src/apis/posts/comments/entity/comments.entity';

export class CreateCommentDto extends PickType(CommentsModel, ['comment']) {}
