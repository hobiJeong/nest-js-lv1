import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { isNumberString } from 'class-validator';
import { Request } from 'express';
import { RolesEnum } from 'src/users/const/roles.const';
import { UsersModel } from 'src/users/entity/users.entity';

interface RequiredMethod {
  isMine: (userId: number, id: number) => Promise<boolean>;
}

export const PARAMS_TOKEN = Symbol('PARAMS_TOKEN');
export const SERVICE_TOKEN = Symbol('SERVICE_TOKEN');

export const SetParamsToken = (token: string) =>
  SetMetadata(PARAMS_TOKEN, token);

@Injectable()
export class IsMineOrAdminGuard<T extends RequiredMethod>
  implements CanActivate
{
  constructor(
    @Inject(SERVICE_TOKEN) private readonly service: T,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (!this.service.isMine) {
      console.error(
        `isMine 메서드가 구현 되어 있지 않거나 서비스의 DI가 실행 되지 않았습니다`,
      );
      throw new InternalServerErrorException('서버 에러');
    }

    const req = context.switchToHttp().getRequest() as Request & {
      user: UsersModel;
    };

    const { user } = req;

    if (!user) {
      console.error('request 객체에 user 프로퍼티가 존재하지 않습니다.');
      throw new InternalServerErrorException('서버 에러');
    }

    /**
     * Admin일 경우 그냥 패스
     */
    if (user.role === RolesEnum.ADMIN) {
      return true;
    }

    const paramsToken = this.reflector.getAllAndOverride<string>(PARAMS_TOKEN, [
      context.getClass(),
      context.getHandler(),
    ]);

    if (!paramsToken) {
      console.error('SetParamsToken과 함께 사용해야 합니다.');
      throw new InternalServerErrorException('서버 에러');
    }

    const resourceId = req.params[paramsToken];

    if (!resourceId || !isNumberString(resourceId)) {
      throw new BadRequestException(
        `${paramsToken} must be provided as numeric values`,
      );
    }

    const isOwner = await this.service.isMine(user.id, parseInt(resourceId));

    if (!isOwner) {
      throw new ForbiddenException('리소스 권한이 없습니다');
    }

    return true;
  }
}
