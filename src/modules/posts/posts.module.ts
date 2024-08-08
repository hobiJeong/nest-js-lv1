import { Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { CommonModule } from '@src/common/common.module';
import { SERVICE_TOKEN } from '@src/common/guard/is-mine-or-admin.guard';
import { POST_REPOSITORY_TOKEN } from '@modules/posts/tokens/di.token';
import { PostsController } from '@modules/posts/controllers/posts.controller';
import { PostsImagesRepository } from '@src/apis/posts/image/repositories/images.repository';
import { PostsImagesService } from '@src/apis/posts/image/services/images.service';
import { PostsRepository } from '@modules/posts/repositories/posts.repository';
import { PostsService } from '@modules/posts/services/posts.service';
import { PrismaModule } from '@src/prisma/prisma.module';
import { UsersModule } from '@modules/users/users.module';

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
