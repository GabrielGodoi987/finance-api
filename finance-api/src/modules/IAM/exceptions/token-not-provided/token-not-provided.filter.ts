import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { TokenNotProvidedException } from './token-not-provided.exception';

@Catch(TokenNotProvidedException)
export class TokenNotProvidedExceptionFilter implements ExceptionFilter {
  catch(exception: TokenNotProvidedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timeStamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
