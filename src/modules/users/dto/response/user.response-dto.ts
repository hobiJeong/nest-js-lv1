import {
  BaseResponseDto,
  BaseResponseDtoProps,
} from '@libs/api/base.response-dto';
import { UserProps } from '@src/apis/users/types/users.type';

export interface UserResponseDtoProps extends BaseResponseDtoProps {
  readonly nickname: string;
  readonly email: string;
  readonly followerCount: number;
  readonly followeeCount: number;
}

export class UserResponseDto
  extends BaseResponseDto
  implements Omit<UserProps, 'password' | 'role'>
{
  readonly nickname: string;
  readonly email: string;
  readonly followerCount: number;
  readonly followeeCount: number;

  constructor(create: UserResponseDtoProps) {
    super(create);

    const { nickname, email, followerCount, followeeCount } = create;

    this.nickname = nickname;
    this.email = email;
    this.followerCount = followerCount;
    this.followeeCount = followeeCount;
  }
}
