import { RolesEnum } from '@src/apis/users/const/roles.const';

export interface UserProps {
  nickname: string;
  email: string;
  password: string;
  role: RolesEnum;
  followerCount: number;
  followeeCount: number;
}

export interface CreateUserProps {
  nickname: string;
  email: string;
  password: string;
}
