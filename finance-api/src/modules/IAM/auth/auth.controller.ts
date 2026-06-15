import { Body, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApplicationController } from '../../../commons/decorators/application/application.decorator';
import { PostRoute } from '../../../commons/decorators/application/controller/post-route.decorator';
import { LoginDto } from './dto/login.dto';
import { CookieService } from './strategy/cookies/cookie.service';
import { AuthenticateUseCase } from './use-case/authenticate.use-case';
import { RefreshTokenUseCase } from './use-case/refresh-token.use-case';

@ApplicationController('auth')
export class AuthController {
  constructor(
    private readonly authenticateUseCase: AuthenticateUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly cookieService: CookieService,
  ) {}

  @PostRoute(
    '/sign-in',
    { type: LoginDto },
    { status: 200, description: 'Usuário autenticado com sucesso' },
  )
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const { userData, accessToken, refreshToken } =
      await this.authenticateUseCase.execute(loginDto);

    this.cookieService.setAccessTokenCookie({
      res,
      accessToken: accessToken,
    });

    this.cookieService.setRefreshTokenCookie({
      res,
      refreshToken: refreshToken,
    });

    return userData;
  }

  @PostRoute(
    '/logout',
    {},
    { status: 204, description: 'Logout realizado com sucesso' },
  )
  async logout(@Res() res: Response) {
    return this.cookieService.clearAuthCookie(res);
  }

  @PostRoute(
    '/refresh-token',
    {},
    { status: 200, description: 'Token atualizado com sucesso' },
  )
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const refreshToken = this.cookieService.getRefreshToken(req);

    const { userData, newAccessToken, newRefreshToken } =
      await this.refreshTokenUseCase.execute(refreshToken);

    this.cookieService.setAccessTokenCookie({
      res,
      accessToken: newAccessToken,
    });
    this.cookieService.setRefreshTokenCookie({
      res,
      refreshToken: newRefreshToken,
    });

    return userData;
  }
}
