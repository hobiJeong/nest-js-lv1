import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { basename, join } from 'path';
import { CommonService } from 'src/common/common.service';
import {
  POST_IMAGE_PATH,
  PUBLIC_FOLDER_PATH,
  TEMP_FOLDER_PATH,
} from 'src/common/const/path.const';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { PaginatePostDto } from 'src/posts/dto/paginate-post.dto';
import { UpdatePostDto } from 'src/posts/dto/update-post.dto';
import { PostsModel } from 'src/posts/entities/posts.entity';
import { Repository } from 'typeorm';
import { promises } from 'fs';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsModel)
    private readonly postsRepository: Repository<PostsModel>,
    private readonly commonService: CommonService,
    private readonly configService: ConfigService,
  ) {}

  async getAllPosts() {
    return this.postsRepository.find({
      relations: ['author'],
    });
  }

  async generatePosts(userId: number) {
    for (let i = 0; i < 100; i++) {
      await this.createPost(userId, {
        title: `임의로 생성된 포스트 제목 ${i}`,
        content: `임의로 생서된 포스트 내용 ${i}`,
      });
    }
  }

  // 1) 오름차 순으로 정렬하는 pagination만 구현한다
  async paginatePosts(dto: PaginatePostDto) {
    return this.commonService.paginate(
      dto,
      this.postsRepository,
      { relations: ['author'] },
      'posts',
    );

    // if (dto.page) {
    //   return this.pagePaginatePosts(dto);
    // } else {
    //   return this.cursorPaginatePosts(dto);
    // }
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  async createPost(authorId: number, postDto: CreatePostDto) {
    /**
     * 1) create -> 저장할 객체를 생성한다
     * 2) save -> 객체를 저장한다. (create 메서드에서 생성한 객체로)
     */
    const post = this.postsRepository.create({
      author: {
        id: authorId,
      },
      ...postDto,

      likeCount: 0,
      commentCount: 0,
    });

    await this.postsRepository.save(post);

    return post;
  }

  async createPostImage(dto: CreatePostDto) {
    // dto의 image 이름을 기반으로
    // 파일의 경로를 생성한다.
    const tempFilePath = join(TEMP_FOLDER_PATH, dto.image);

    try {
      // 파일이 존재하는지 확인
      // 만약에 존재하지 않는다면 에러를 던짐짐
      await promises.access(tempFilePath);
    } catch (e) {
      throw new BadRequestException('존재하지 않는 파일 입니다.');
    }

    // 파일의 이름만 가져오기
    // /Users/aaa/bbb/ccc/asdf.jpg => asdf.jpg
    const fileName = basename(tempFilePath);

    // 새로 이동할 포스트 폴더의 경로 + 이미지 이름
    // {프로젝트 경로}/public/posts/asdf.jpg
    const newPath = join(POST_IMAGE_PATH, fileName);

    await promises.rename(tempFilePath, newPath);

    return true;
  }

  async updatePost(postId: number, postDto: UpdatePostDto) {
    const { title, content } = postDto;

    /**
     * save의 기능
     * 1) 만약에 데이터가 존재하지 않는다면 (id 기준으로) 새로 생성한다.
     * 2) 만약에 데이터가 존재한다면 (같은 id의 값이 존재한다면) 존재하던 값을 업데이트한다.(save 메서드에 id를 넣으면 조회를 먼저 함)
     */
    const post = await this.postsRepository.findOne({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new NotFoundException();
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    const newPost = await this.postsRepository.save(post);

    return newPost;
  }

  async deletePost(postId: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new NotFoundException();
    }

    await this.postsRepository.delete(postId);

    return postId;
  }
}
