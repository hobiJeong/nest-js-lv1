import { Module } from '@nestjs/common';
import { AuthModule } from '@src/apis/auth/auth.module';
import { CommonModule } from '@src/common/common.module';
import { SERVICE_TOKEN } from '@src/common/guard/is-mine-or-admin.guard';
import { POST_REPOSITORY_TOKEN } from '@src/apis/posts/tokens/di.token';
import { PostsController } from '@src/apis/posts/controllers/posts.controller';
import { PostsImagesRepository } from '@src/apis/posts/image/repositories/images.repository';
import { PostsImagesService } from '@src/apis/posts/image/services/images.service';
import { PostsRepository } from '@src/apis/posts/repositories/posts.repository';
import { PostsService } from '@src/apis/posts/services/posts.service';
import { PrismaModule } from '@src/prisma/prisma.module';
import { UsersModule } from '@src/apis/users/users.module';

@Module({
  imports: [AuthModule, UsersModule, CommonModule, PrismaModule],
  controllers: [PostsController],
  providers: [
    PostsService,
    PostsImagesService,
    { provide: SERVICE_TOKEN, useClass: PostsService },
    { provide: POST_REPOSITORY_TOKEN, useClass: PostsRepository },
    PostsImagesRepository,
  ],
  exports: [PostsService],
})
export class PostsModule {}
