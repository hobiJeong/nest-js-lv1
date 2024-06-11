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
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
