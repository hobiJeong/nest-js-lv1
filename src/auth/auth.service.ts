import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/auth/const/auth.const';
import { UsersModel } from 'src/users/entities/users.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * 우리가 만드려는 기능
   *
   * 1) registerWithEmail
   *    - email, nickname, password를 입력받고 사용자 생성.
   *    - 생성이 완료되면 accessToken, refreshToken을 반환한다.
   *        회원가입 후 다시 로그인해주세요 <-- 이런 쓸데없는 과정을 방지하기 위해서
   *
   * 2) loginWithEmail
   *    - email, password를 입력하면 사용자 검증을 진행한다.
   *    - 검증이 완료되면 accessToken, refreshToken을 반환한다.
   *
   * 3) loginUser
   *    - (1)과 (2)에서 필요한 accessToken, refreshToken을 반환하는 로직
   *
   * 4) signToken
   *    - (3)에서 필요한 accessToken과 refreshToken을 sign하는 로직
   *
   * 5) authenticateWithEmailAndPassword
   *    - (2)에서 로그인 진행할 때 필요한 기본적인 검증 진행
   *        1. 사용자가 존재하는지 확인 (email)
   *        2. 비밀번호가 맞는지 확인
   *        3. 모두 통과되면 찾은 사용자 정보 반환
   *        4. loginWithEmail에서 반환된 데이터를 기반으로 토큰 생성
   */

  /**
   * Payload에 들어갈 정보
   *
   * 1) email
   * 2) sub -> id
   * 3) type :  'access' | 'refresh'
   *
   * {email: string, id: number} 와의 차이점
   * - context를 조금 더 지울 수 있음. -> 문맥이 생김
   * - 사용자의 문맥 상 봤을 때 email, id를 받고 싶은 것이다. 라고 코드를 읽는 사람이 바로 이해 가능
   */
  signToken(user: Pick<UsersModel, 'email' | 'id'>, isRefreshToken: boolean) {
    const payload = {
      email: user.email,
      sub: user.id,
      type: isRefreshToken ? 'refresh' : 'access',
    };

    return this.jwtService.sign(payload, {
      secret: JWT_SECRET,
      // seconds
      expiresIn: isRefreshToken ? 3600 : 300,
    });
  }
}
