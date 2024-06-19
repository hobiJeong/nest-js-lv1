import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/common/common.service';
import { DEFAULT_COMMENT_FIND_OPTIONS } from 'src/posts/comments/const/default-comment-find-options.const';
import { CreateCommentDto } from 'src/posts/comments/dto/create-comment.dto';
import { PaginateCommentsDto } from 'src/posts/comments/dto/paginate-comments.dto';
import { UpdateCommentDto } from 'src/posts/comments/dto/update-comment.dto';
import { CommentsModel } from 'src/posts/comments/entity/comments.entity';
import { UsersModel } from 'src/users/entity/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsModel)
    private readonly commentsRepository: Repository<CommentsModel>,
    private readonly commonService: CommonService,
  ) {}

  paginateComments(dto: PaginateCommentsDto, postId: number) {
    return this.commonService.paginate(
      dto,
      this.commentsRepository,
      {
        where: {
          post: {
            id: postId,
          },
        },
        relations: {
          author: true,
        },
      },
      `posts/${postId}/comments`,
    );
  }

  async getCommentById(id: number) {
    const comment = await this.commentsRepository.findOne({
      ...DEFAULT_COMMENT_FIND_OPTIONS,
      where: {
        id,
      },
    });
    if (!comment) {
      throw new BadRequestException(`id: ${id} Comment는 존재하지 않습니다.`);
    }

    return comment;
  }

  async createComment(
    dto: CreateCommentDto,
    postId: number,
    author: UsersModel,
  ) {
    return this.commentsRepository.save({
      ...dto,
      post: {
        id: postId,
      },
      author,
      likeCount: 0,
    });
  }

  async updateComment(dto: UpdateCommentDto, commentId: number) {
    const comment = await this.commentsRepository.findOne({
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      throw new BadRequestException(`존재하지 않는 댓글입니다.`);
    }

    const prevComment = await this.commentsRepository.preload({
      id: commentId,
      ...dto,
    });

    const newComment = await this.commentsRepository.save(prevComment);

    return newComment;
  }

  async deleteComment(id: number) {
    const comment = await this.commentsRepository.findOne({
      where: {
        id,
      },
    });

    if (!comment) {
      throw new BadRequestException(`존재하지 않는 댓글입니다.`);
    }

    await this.commentsRepository.delete(id);

    return id;
  }
}
