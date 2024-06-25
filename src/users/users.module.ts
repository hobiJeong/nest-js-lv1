import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModel } from 'src/users/entity/users.entity';
import { UserFollowersModel } from 'src/users/entity/user-followers.entity';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersModel, UserFollowersModel]),
    PrismaModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
