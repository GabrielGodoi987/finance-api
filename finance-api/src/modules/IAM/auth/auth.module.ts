import { Module } from '@nestjs/common';
import { UserRepositoryImpl } from '../../profile/profile-users/infra/repositories/user.repositoryImpl.prisma';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { CookieService } from './strategy/cookies/cookie.service';
import { AuthenticateUseCase } from './use-case/authenticate.use-case';
import { RefreshTokenUseCase } from './use-case/refresh-token.use-case';

@Module({
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    AuthenticateUseCase,
    RefreshTokenUseCase,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryImpl,
    },
    CookieService,
  ],
})
export class AuthModule {}
