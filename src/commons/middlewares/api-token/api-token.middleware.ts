import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ApiTokenMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-api-token'] as string;

    console.log('Received API token:', token); // Log the received token for debugging

    if (!token) {
      return res.status(400).json({ error: 'API token is missing' });
    }

    if (!this.validateToken(token)) {
      return res.status(401).json({ error: 'Invalid API token' });
    }

    console.log('Chegou aqui');
    next();
  }

  private validateToken(token: string) {
    console.log(this.configService.get<string>('API_TOKEN'));
    return token === this.configService.get<string>('API_TOKEN');
  }
}
