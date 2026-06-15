import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { InvalidRefreshTokenException } from './invalid-refresh-token.exception';

@Catch(InvalidRefreshTokenException)
export class InvalidRefreshTokenExceptionFilter implements ExceptionFilter {
  catch(exception: InvalidRefreshTokenException, host: ArgumentsHost) {
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
