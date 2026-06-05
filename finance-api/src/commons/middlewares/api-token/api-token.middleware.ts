import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ApiTokenMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.header('x-api-token');
    console.log('Headers recebidos:', JSON.stringify(req.headers || {}));
    console.log('Token via header():', token);

    if (!token) {
      return res.status(400).json({ error: 'API token is missing' });
    }

    if (!this.validateToken(token)) {
      return res.status(401).json({ error: 'Invalid API token' });
    }

    next();
  }

  private validateToken(token: string) {
    return token === this.configService.get<string>('API_TOKEN');
  }
}
