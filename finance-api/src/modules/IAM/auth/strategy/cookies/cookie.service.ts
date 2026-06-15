import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { TokenNotProvidedException } from '../../../exceptions/token-not-provided/token-not-provided.exception';

@Injectable()
export class CookieService {
  async setAccessTokenCookie({
    res,
    accessToken,
  }: {
    res: Response;
    accessToken: string;
  }) {
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 60000 * 10,
      path: '/',
    });
  }

  async setRefreshTokenCookie({
    res,
    refreshToken,
  }: {
    res: Response;
    refreshToken: string;
  }) {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 60000 * 60 * 10,
      path: '/finance/api/v1/auth/refresh-token',
    });
  }

  clearAuthCookie(res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(204).end();
  }

  getRefreshToken(req: Request) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new TokenNotProvidedException('Token was not provided');
    }

    return refreshToken;
  }
}
