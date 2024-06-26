import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BasicTokenGuard } from 'src/auth/guard/basic-token.guard';
import { RefreshTokenGuard } from 'src/auth/guard/bearer-token.guard';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import { IsPublic } from 'src/common/decorator/is-public.decorator';
import { User } from 'src/users/decorator/user.decorator';
import { UsersModel } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token/access')
  @IsPublic()
  @UseGuards(RefreshTokenGuard)
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
  @IsPublic()
  @UseGuards(RefreshTokenGuard)
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
  @IsPublic()
  @UseGuards(BasicTokenGuard)
  postLoginEmail(@User() user: UsersModel) {
    return this.authService.loginWithEmail({
      email: user.email,
      password: user.password,
    });
  }

  @Post('register/email')
  @IsPublic()
  postRegisterEmail(@Body() body: RegisterUserDto) {
    return this.authService.registerWithEmail(body);
  }
}
