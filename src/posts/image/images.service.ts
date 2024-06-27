import { BadRequestException, Injectable } from '@nestjs/common';
import { join, basename } from 'path';
import { TEMP_FOLDER_PATH, POST_IMAGE_PATH } from 'src/common/const/path.const';
import { promises } from 'fs';
import { CreatePostImageDto } from 'src/posts/image/dto/create-image.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ImageModel, Prisma } from '@prisma/client';

@Injectable()
export class PostsImagesService {
  constructor(private readonly prisma: PrismaService) {}

  getTx(
    tx?: Prisma.TransactionClient,
  ): PrismaService | Prisma.TransactionClient {
    return tx ? tx : this.prisma;
  }

  async createPostImage(
    dto: CreatePostImageDto,
    tx?: Prisma.TransactionClient,
  ): Promise<ImageModel> {
    const prisma = this.getTx(tx);
    // dto의 image 이름을 기반으로
    // 파일의 경로를 생성한다.
    const tempFilePath = join(TEMP_FOLDER_PATH, dto.path);

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

    // save
    const result = await prisma.imageModel.create({
      data: {
        ...dto,
      },
    });

    // 파일 옮기기
    await promises.rename(tempFilePath, newPath);

    return result;
  }
}
