import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/users/decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    /**
     * Roles annotation에 대한 metadata를 가져 와야 한다.
     *
     * Reflector
     * NestJS의 IoC에서 자동으로 주입을 받을 수 있음.
     * getAllAndOverride() -> 키에 해당되는 annotation에 대한 정보를 전부 다 가져옴.
     *                        그 중에 가장 가까운 annotation을 가져와서 값들을 override 해줌.
     */
    const requiredRole = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Roles Annotation이 등록 안돼있음.
    // 전역으로 Guard를 설정하고 Roles 데코레이터를 적용한 곳만 검증을 하기 위함
    if (!requiredRole) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      throw new UnauthorizedException('토큰을 제공 해주세요!');
    }

    if (user.role !== requiredRole) {
      throw new ForbiddenException(
        `이 작업을 수행할 권한이 없습니다. ${requiredRole} 권한이 필요합니다.`,
      );
    }

    return true;
  }
}
