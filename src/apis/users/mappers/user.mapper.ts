import { baseSchema } from '@libs/db/base.repository';
import { Mapper } from '@libs/ddd/mapper.interface';
import { Injectable } from '@nestjs/common';
import { RolesEnum } from '@src/apis/users/const/roles.const';
import { UserEntity } from '@src/apis/users/domain/users.entity';
import { UserResponseDto } from '@src/apis/users/dto/response/user.response-dto';
import { z } from 'zod';

export const userSchema = baseSchema.extend({
  nickname: z.string().min(1).max(20),
  email: z.string().min(1).max(255),
  password: z.string().min(1).max(255),
  role: z.nativeEnum(RolesEnum),
  followerCount: z.number().int().nonnegative(),
  followeeCount: z.number().int().nonnegative(),
});

export type UserModel = z.TypeOf<typeof userSchema>;

@Injectable()
export class UserMapper
  implements Mapper<UserEntity, UserModel, UserResponseDto>
{
  toPersistence(entity: UserEntity): UserModel {
    const props = entity.getProps();

    const record: UserModel = {
      id: props.id,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      nickname: props.nickname,
      email: props.email,
      password: props.password,
      role: props.role,
      followerCount: props.followerCount,
      followeeCount: props.followeeCount,
    };

    return userSchema.parse(record);
  }

  toEntity(record: UserModel): UserEntity {
    return new UserEntity({
      id: record.id,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      props: {
        nickname: record.nickname,
        email: record.email,
        password: record.password,
        role: record.role,
        followerCount: record.followerCount,
        followeeCount: record.followeeCount,
      },
    });
  }

  toResponseDto(entity: UserEntity): UserResponseDto {
    const props = entity.getProps();

    return new UserResponseDto(props);
  }
}
