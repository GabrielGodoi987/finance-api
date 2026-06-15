import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../../../profile/profile-users/domain/repositories/user-repository';
import { JwtStrategy } from '../../strategies/jwt.strategy';
import { CookieService } from '../strategy/cookies/cookie.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly cookieService: CookieService,
    private readonly jwtService: JwtStrategy,
    private readonly userRepository: UserRepository,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const jwtToken = this.cookieService.getRefreshToken(req);
    const { name, email, sub } = await this.jwtService.validateAccessToken<{
      name: string;
      email: string;
      sub: string;
      iat: number;
    }>(jwtToken);

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User was not found');
    }

    req.user = {
      id: sub,
      email,
      name,
      role: user.getRole(),
    };

    next();
  }
}
