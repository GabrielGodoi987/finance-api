import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { RefreshTokenValidationException } from './refresh-token-validation.exception';

@Catch(RefreshTokenValidationException)
export class RefreshValidationTokenExceptionFilter implements ExceptionFilter {
  catch(exception: RefreshTokenValidationException, host: ArgumentsHost) {
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
