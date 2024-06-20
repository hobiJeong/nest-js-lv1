import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModel } from 'src/users/entity/users.entity';
import { UserFollowersModel } from 'src/users/entity/user-followers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersModel, UserFollowersModel])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
