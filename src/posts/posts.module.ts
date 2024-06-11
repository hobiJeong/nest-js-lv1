import { BadRequestException, Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModel } from 'src/posts/entities/posts.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { CommonModule } from 'src/common/common.module';
import { MulterModule } from '@nestjs/platform-express';
import { extname } from 'path';
import * as multer from 'multer';
import { POST_IMAGE_PATH } from 'src/common/const/path.const';

import { v4 as uuid } from 'uuid';

/**
 * TypeORM 모델과 연동이 되는 레포지터리의 모듈을 import 해줘야 주입 가능. --> forFeature
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([PostsModel]),
    AuthModule,
    UsersModule,
    CommonModule,
    MulterModule.register({
      limits: {
        // byte 단위로 입력
        fileSize: 10_000_000,
      },
      fileFilter: (req, file, cb) => {
        /**
         * cb(에러, boolean)
         *
         * 첫번째 파라미터에는 에러가 있을 경우 에러 정보를 넣어준다.
         * 두번째 파라미터에는 파일을 받을지 말지 boolean을 넣어준다.
         */
        // xxx.jpg -> .jpg
        const ext = extname(file.originalname);

        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
          return cb(
            new BadRequestException('jpg/jpeg/png 파일만 업로드 가능합니다.'),
            false,
          );
        }

        return cb(null, true);
      },

      storage: multer.diskStorage({
        // post image의 저장 경로
        destination: (req, res, cb) => {
          cb(null, POST_IMAGE_PATH);
        },
        filename: (req, file, cb) => {
          // 파일의 originalname이 아닌 절대로 겹치지 않을 이름으로 file을 저장
          // 1231231-123-123123-123123.jpg
          cb(null, `${uuid()}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
