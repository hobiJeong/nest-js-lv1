import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModel } from 'src/posts/comments/entity/comments.entity';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { PostsExistsMiddleware } from 'src/posts/comments/middleware/post-exists.middleware';
import { PostsModule } from 'src/posts/posts.module';
import { SERVICE_TOKEN } from 'src/common/guard/is-mine-or-admin.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentsModel]),
    CommonModule,
    AuthModule,
    UsersModule,
    PostsModule,
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
