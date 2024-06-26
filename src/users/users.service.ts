import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UsersModel } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(user: Pick<UsersModel, 'email' | 'nickname' | 'password'>) {
    // 1) nickname 중복이 없는지 확인
    // exist() -> 만약에 조건에 해당하는 값이 있으면 true 반환
    const nicknameExists = await this.prisma.usersModel.findUnique({
      select: {
        id: true,
      },
      where: {
        nickname: user.nickname,
      },
    });

    if (nicknameExists) {
      throw new BadRequestException('이미 존재하는 nickname 입니다!');
    }

    const emailExists = await this.prisma.usersModel.findUnique({
      select: {
        id: true,
      },
      where: {
        email: user.email,
      },
    });

    if (emailExists) {
      throw new BadRequestException('이미 가입한 이메일입니다!');
    }

    const userObject = await this.prisma.usersModel.create({
      data: {
        ...user,
      },
    });

    return userObject;
  }

  async getAllUsers() {
    return this.prisma.usersModel.findMany();
  }

  async getUserByEmail(email: string): Promise<UsersModel> {
    return this.prisma.usersModel.findUnique({
      where: {
        email,
      },
    });
  }

  async followUser(followerId: number, followeeId: number) {
    return this.prisma.userFollowersModel.create({
      data: {
        followerId,
        followeeId,
      },
    });
  }

  async getFollowers(userId: number, includeNotConfirmed: boolean) {
    const where = {
      followerId: userId,
      isConfirmed: true,
    };

    if (!includeNotConfirmed) {
      where['isConfirmed'] = true;
    }

    const result = await this.prisma.userFollowersModel.findMany({
      where,
      include: { follower: true, followee: true },
    });

    return result.map((x) => ({
      id: x.follower.id,
      nickname: x.follower.nickname,
      email: x.follower.email,
      isConfirmed: x.isConfirmed,
    }));
  }

  async confirmFollow(followerId: number, followeeId: number) {
    const existing = await this.prisma.userFollowersModel.findFirst({
      where: {
        followerId,
        followeeId,
      },
    });

    if (!existing) {
      throw new BadRequestException('존재하지 않는 팔로우 요청입니다.');
    }

    await this.prisma.userFollowersModel.upsert({
      where: {
        id: existing.id,
      },
      create: {
        ...existing,
      },
      update: {
        ...existing,
      },
    });

    return true;
  }

  async deleteFollow(followerId: number, followeeId: number) {
    const { id } = await this.prisma.userFollowersModel.findFirst({
      where: {
        followeeId,
        followerId,
      },
      select: { id: true },
    });

    if (!id) {
      throw new NotFoundException('해당 팔로우가 존재하지 않습니다.');
    }

    await this.prisma.userFollowersModel.delete({
      where: {
        id,
      },
    });

    return true;
  }

  async incrementFollowerCount(userId: number) {
    await this.prisma.usersModel.update({
      where: {
        id: userId,
      },
      data: {
        followerCount: {
          increment: 1,
        },
      },
    });
  }

  async decrementFollowerCount(userId: number) {
    await this.prisma.usersModel.update({
      where: { id: userId },
      data: { followerCount: { decrement: 1 } },
    });
  }
}
