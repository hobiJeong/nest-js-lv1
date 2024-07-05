import { Module } from '@nestjs/common';
import { AuthModule } from '@src/auth/auth.module';
import { CommonModule } from '@src/common/common.module';
import { SERVICE_TOKEN } from '@src/common/guard/is-mine-or-admin.guard';
import { PostsController } from '@src/posts/controllers/posts.controller';
import { PostsImagesRepository } from '@src/posts/image/repositories/images.repository';
import { PostsImagesService } from '@src/posts/image/services/images.service';
import { PostsRepository } from '@src/posts/repositories/posts.repository';
import { PostsService } from '@src/posts/services/posts.service';
import { PrismaModule } from '@src/prisma/prisma.module';
import { UsersModule } from '@src/users/users.module';

@Module({
  imports: [AuthModule, UsersModule, CommonModule, PrismaModule],
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
