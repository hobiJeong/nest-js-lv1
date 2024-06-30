import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModel } from 'src/posts/entity/posts.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { CommonModule } from 'src/common/common.module';

import { ImageModel } from 'src/common/entity/image.entity';
import { SERVICE_TOKEN } from 'src/common/guard/is-mine-or-admin.guard';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PostsImagesService } from 'src/posts/image/services/images.service';
import { PostsRepository } from 'src/posts/repositories/posts.repository';
import { PostsImagesRepository } from 'src/posts/image/repositories/images.repository';

/**
 * TypeORM 모델과 연동이 되는 레포지터리의 모듈을 import 해줘야 주입 가능. --> forFeature
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([PostsModel, ImageModel]),
    AuthModule,
    UsersModule,
    CommonModule,
    PrismaModule,
  ],
  controllers: [PostsController],
  providers: [
    PostsService,
    PostsImagesService,
    { provide: SERVICE_TOKEN, useClass: PostsService },
    PostsRepository,
    PostsImagesRepository,
  ],
  exports: [PostsService],
})
export class PostsModule {}
