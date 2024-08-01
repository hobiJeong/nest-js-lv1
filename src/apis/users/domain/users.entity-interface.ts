import { UserRole } from '@src/apis/users/const/users.const';
import { ValueOf } from '@src/common/types/common.type';

export interface UserProps {
  nickname: string;
  email: string;
  password: string;
  role: ValueOf<typeof UserRole>;
  followerCount: number;
  followeeCount: number;
}

export interface CreateUserProps {
  nickname: string;
  email: string;
  password: string;
}
