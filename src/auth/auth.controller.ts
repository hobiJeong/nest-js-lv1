import { Body, Controller, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token/access')
  postTokenAccess(@Headers('authorization') rawToken: string) {
    const token = this.authService.extractTokenFormHeader(rawToken, true);

    const newToken = this.authService.rotateToken(token, false);

    /**
     * {accessToken: {token}}
     */
    return {
      accessToken: newToken,
    };
  }

  @Post('token/refresh')
  postTokenRefresh(@Headers('authorization') rawToken: string) {
    const token = this.authService.extractTokenFormHeader(rawToken, true);

    const newToken = this.authService.rotateToken(token, true);

    /**
     * {refreshToken: {token}}
     */
    return {
      refreshToken: newToken,
    };
  }

  @Post('login/email')
  postLoginEmail(@Headers('authorization') rawToken: string) {
    // email:password -> base64
    const token = this.authService.extractTokenFormHeader(rawToken, false);

    const credentials = this.authService.decodeToken(token);

    return this.authService.loginWithEmail({
      email: credentials.email,
      password: credentials.password,
    });
  }

  @Post('register/email')
  postRegisterEmail(
    @Body('nickname') nickname: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.registerWithEmail({
      nickname,
      email,
      password,
    });
  }
}
