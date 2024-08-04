import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { CommonService } from 'src/common/common.service';
import { PaginatePostDto } from '@src/apis/posts/dto/paginate-post.dto';
import { UpdatePostDto } from '@src/apis/posts/dto/update-post.dto';

import { plainToInstance } from 'class-transformer';
import type { PostWithAuthorAndImages } from '@src/apis/posts/type/post.type';
import { PostImageModel } from 'src/common/entity/image.model';
import { PostsPaginateFindManyArgs } from 'src/common/const/find-many-args.type';
import { PostsImagesService } from '@src/apis/posts/image/services/images.service';
import { CreatePostAndImagesDto } from '@src/apis/posts/dto/create-post-and-images.dto';
import { PostsRepository } from '@src/apis/posts/repositories/posts.repository';
import { Transactional } from '@nestjs-cls/transactional';
import { RequiredMethod } from 'src/common/guard/is-mine-or-admin.guard';
import { CustomPrismaClient } from 'src/prisma/types/type';
import { CUSTOM_PRISMA_CLIENT } from 'src/prisma/prisma.module';
import { PostEntity } from '@src/apis/posts/domain/post.entity';

@Injectable()
export class PostsService implements RequiredMethod {
  constructor(
    private readonly commonService: CommonService,
    @Inject(CUSTOM_PRISMA_CLIENT) private readonly prisma: CustomPrismaClient,
    private readonly postsImagesService: PostsImagesService,
    private readonly postsRepository: PostsRepository,
  ) {}

  async generatePosts(userId: bigint) {
    for (let i = 0; i < 100; i++) {
      await this.createPost(userId, {
        title: `임의로 생성된 포스트 제목 ${i}`,
        content: `임의로 생서된 포스트 내용 ${i}`,
        images: [],
      });
    }
  }

  async paginatePosts(dto: PaginatePostDto) {
    return this.commonService.paginate<
      PaginatePostDto,
      Post,
      PostsPaginateFindManyArgs
    >(dto, this.prisma.post, 'posts', {
      include: { author: true, imageModel: true },
    });
  }

  async getPostById(id: bigint): Promise<PostEntity> {
    const post = await this.postsRepository.findOneByIdWithUser(id);

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  @Transactional()
  incrementCommentCount(entity: PostEntity) {
    entity.incrementCommentCount();

    return this.postsRepository.update(entity);
  }

  @Transactional()
  decrementCommentCount(entity: PostEntity) {
    entity.decrementCommentCount;

    return this.postsRepository.update(entity);
  }

  @Transactional()
  async createPost(
    userId: bigint,
    postDto: CreatePostAndImagesDto,
  ): Promise<PostWithAuthorAndImages> {
    const { images, ...postProps } = postDto;

    const newPost = await this.postsRepository.create({
      userId,
      ...postProps,
    });

    const imagesModel: PostImageModel[] = [];

    if (images.length) {
      await Promise.all(
        images.map(async (el, index) => {
          const image = await this.postsImagesService.createPostImage({
            postId: newPost.id,
            order: index,
            path: postDto.images[index],
            type: $Enums.ImageType.POST,
          });

          imagesModel.push(plainToInstance(PostImageModel, image));
        }),
      );
    }

    newPost['imageModel'] = imagesModel;

    return newPost as PostWithAuthorAndImages;
  }

  async updatePost(postId: bigint, postDto: UpdatePostDto) {
    const { title, content } = postDto;

    const post = await this.postsRepository.findUniqueById(postId);

    if (!post) {
      throw new NotFoundException();
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    return this.postsRepository.update({
      ...post,
    });
  }

  async deletePost(postId: bigint) {
    const post = await this.postsRepository.findUniqueById(postId);

    if (!post) {
      throw new NotFoundException();
    }

    await this.prisma.post.delete({ where: { id: postId } });

    return postId;
  }

  async checkPostExistsById(id: bigint): Promise<boolean> {
    return !!(await this.postsRepository.findOneById(id));
  }

  async isMine(userId: bigint, id: bigint): Promise<boolean> {
    return !!(await this.postsRepository.findOneByIdAndUserIdWithUser(
      id,
      userId,
    ));
  }
}
