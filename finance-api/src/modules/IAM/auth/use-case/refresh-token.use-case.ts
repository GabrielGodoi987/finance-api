import {
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../../../profile/profile-users/domain/repositories/user-repository';
import { InvalidRefreshTokenException } from '../../exceptions/invalid-token/refresh/invalid-refresh-token.exception';
import { RefreshTokenValidationException } from '../../exceptions/validation-token-exception/refresh/refresh-token-validation.exception';
import { JwtStrategy } from '../../strategies/jwt.strategy';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    @Inject('UserRepository')
    private userRepository: UserRepository,
    private jwtService: JwtStrategy,
  ) {}

  async execute(token: string): Promise<{
    userData: { name: string; email: string };
    newAccessToken: string;
    newRefreshToken: string;
  }> {
    const { payload } = await this.verifyAndValidateRefreshToken(token);

    const user = await this.userRepository.findById(payload.sub);

    if (!user) {
      throw new NotFoundException('User was not found');
    }

    // generate new Access token
    const accessToken = await this.jwtService.generateAccessToken({
      name: user.getName(),
      email: user.getEmail(),
      identifier: user.getId(),
    });

    // generate new refresh token
    const refreshToken = await this.jwtService.generateRefreshToken({
      name: user.getName(),
      email: user.getEmail(),
      identifier: user.getId(),
    });

    // return it, with the user data
    return {
      userData: {
        name: user.getName(),
        email: user.getEmail(),
      },
      newAccessToken: accessToken,
      newRefreshToken: refreshToken,
    };
  }

  private async verifyAndValidateRefreshToken(token: string) {
    try {
      const payload = await this.jwtService.validateRefreshToken<{
        name: string;
        email: string;
        sub: string;
        iat: number;
      }>(token);

      if (!payload) {
        throw new InvalidRefreshTokenException('Refresh token is not valid');
      }

      return { payload };
    } catch (error: any) {
      console.error(error);
      throw new RefreshTokenValidationException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
