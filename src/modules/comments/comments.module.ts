import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModel } from '@src/apis/posts/comments/entity/comments.entity';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from '@modules/auth/auth.module';
import { UsersModule } from '@modules/users/users.module';
import { PostsExistsMiddleware } from '@src/apis/posts/comments/middleware/post-exists.middleware';
import { PostsModule } from '@modules/posts/posts.module';
import { SERVICE_TOKEN } from 'src/common/guard/is-mine-or-admin.guard';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentsModel]),
    CommonModule,
    AuthModule,
    UsersModule,
    PostsModule,
    PrismaModule,
  ],
  controllers: [CommentsController],
  providers: [
    CommentsService,
    {
      provide: SERVICE_TOKEN,
      useClass: CommentsService,
    },
  ],
})
export class CommentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PostsExistsMiddleware).forRoutes(CommentsController);
  }
}
