import { BadRequestException, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../../profile/profile-users/domain/repositories/user-repository';
import { JwtStrategy } from '../../strategies/jwt.strategy';
import { LoginDto } from '../dto/login.dto';
import { AuthUser } from '../interfaces/auth-user.interfaces';

export class AuthenticateUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    private jwtStrategy: JwtStrategy,
  ) {}

  async execute(loginDto: LoginDto): Promise<{
    userData: AuthUser;
    accessToken: string;
    refreshToken: string;
  }> {
    const { email, password } = loginDto;
    const doesUserExists = await this.userRepository.findByEmail(email);

    if (!doesUserExists) {
      throw new BadRequestException('User doesnt exists');
    }

    const isValidPassword = await this.validatePassword({
      sendedPassword: password,
      correctPassword: doesUserExists.getPassword(),
    });

    if (!isValidPassword) {
      throw new BadRequestException('Credentials are not valid');
    }

    const accessToken = await this.jwtStrategy.generateAccessToken({
      name: doesUserExists.getName(),
      email,
      identifier: doesUserExists.getId(),
    });

    const refreshToken = await this.jwtStrategy.generateRefreshToken({
      name: doesUserExists.getName(),
      email,
      identifier: doesUserExists.getId(),
    });

    return {
      userData: {
        id: doesUserExists.getId(),
        name: doesUserExists.getName(),
        email: doesUserExists.getEmail(),
        role: doesUserExists.getRole(),
      },
      accessToken,
      refreshToken,
    };
  }

  private async validatePassword({
    sendedPassword,
    correctPassword,
  }: {
    sendedPassword: string;
    correctPassword: string;
  }) {
    return await bcrypt.compare(sendedPassword, correctPassword);
  }
}
