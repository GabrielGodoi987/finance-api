import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { envs } from '../../../commons/constants/envs.constants';

export type JwtPayload = Record<string, unknown>;

type TokenKind = 'access' | 'refresh';

@Injectable()
export class JwtStrategy {
  constructor(private readonly jwtService: JwtService) {}

  public async generateAccessToken(
    payload: JwtPayload & { identifier: string | undefined },
  ): Promise<string> {
    return this.jwtService.signAsync(
      payload,
      this.getSignOptions({ kind: 'access', identifier: payload.identifier }),
    );
  }

  public async generateRefreshToken(
    payload: JwtPayload & { identifier: string | undefined },
  ): Promise<string> {
    return this.jwtService.signAsync(
      payload,
      this.getSignOptions({ kind: 'refresh', identifier: payload.identifier }),
    );
  }

  public async validateAccessToken<TPayload extends JwtPayload = JwtPayload>(
    token: string,
  ): Promise<TPayload> {
    return this.verifyToken<TPayload>(token, 'access');
  }

  public async validateRefreshToken<TPayload extends JwtPayload = JwtPayload>(
    token: string,
  ): Promise<TPayload> {
    return this.verifyToken<TPayload>(token, 'refresh');
  }

  private async verifyToken<TPayload extends JwtPayload>(
    token: string,
    kind: TokenKind,
  ): Promise<TPayload> {
    try {
      return await this.jwtService.verifyAsync<TPayload>(
        token,
        this.getVerifyOptions(kind),
      );
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private getSignOptions({
    kind,
    identifier,
  }: {
    kind: TokenKind;
    identifier: string | undefined;
  }): JwtSignOptions {
    const expiresIn =
      kind === 'access' ? envs.JWT_EXPIRATION : envs.JWT_REFRESH_EXPIRATION;

    return {
      algorithm: 'HS256',
      expiresIn: expiresIn as JwtSignOptions['expiresIn'],
      secret: this.getSecret(kind),
      subject: identifier,
    };
  }

  private getVerifyOptions(kind: TokenKind): JwtVerifyOptions {
    return {
      algorithms: ['HS256'],
      secret: this.getSecret(kind),
    };
  }

  private getSecret(kind: TokenKind): string {
    const secret =
      kind === 'access' ? envs.JWT_ACCESS_SECRET : envs.JWT_REFRESH_SECRET;

    if (!secret) {
      throw new Error(`Missing JWT ${kind} secret`);
    }

    return secret;
  }
}
