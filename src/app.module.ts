import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from 'src/posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { PostsModel } from 'src/posts/entities/posts.entity';
import { UsersModule } from './users/users.module';
import { UsersModel } from 'src/users/entities/users.entity';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import {
  ENV_DB_DATABASE_KEY,
  ENV_DB_HOST_KEY,
  ENV_DB_PASSWORD_KEY,
  ENV_DB_PORT_KEY,
  ENV_DB_USERNAME_KEY,
} from 'src/common/const/env-keys.const';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PUBLIC_FOLDER_PATH } from 'src/common/const/path.const';
import { ImageModel } from 'src/common/entity/image.entity';
import { LogMiddleware } from 'src/common/middleware/log.middleware';

dotenv.config();

/**
 * TypeOrmModule.forRoot --> 루트 모듈에서 import할 때 사용.
 * 연결 설정같은 것들을 forRoot 메서드의 인수로 넘김
 * DynamicModule임.
 */
@Module({
  imports: [
    PostsModule,
    ServeStaticModule.forRoot({
      // 4022.jpg
      // 파일이 업로드 되는 rootPath
      // 근데 이렇게만 했을 때에는 요청을
      // http://localhost:3000/public/posts/4022.jpg
      // 이 아닌
      // http://localhost:3000/posts/4022.jpg
      // 로 요청을 해야 serve 받을 수 있음
      rootPath: PUBLIC_FOLDER_PATH,
      // 하지만 /posts의 경우엔 이미 GET 요청의 엔드포인트와 겹침
      // 해당 option을 정의 해줌으로써
      // public이라는 prefix를 만들어 줄 수 있음.
      // http://localhost:3000/public/posts/4022.jpg
      serveRoot: '/public',
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env[ENV_DB_HOST_KEY],
      port: +process.env[ENV_DB_PORT_KEY],
      username: process.env[ENV_DB_USERNAME_KEY],
      password: process.env[ENV_DB_PASSWORD_KEY],
      database: process.env[ENV_DB_DATABASE_KEY],
      entities: [PostsModel, UsersModel, ImageModel],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    AuthModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
