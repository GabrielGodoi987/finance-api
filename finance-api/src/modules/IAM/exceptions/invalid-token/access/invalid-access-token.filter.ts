import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { InvalidAccessTokenException } from './invalid-access-token.exception';

@Catch(InvalidAccessTokenException)
export class InvalidAccessTokenExceptionFilter extends BaseExceptionFilter {
  catch(exception: InvalidAccessTokenException, host: ArgumentsHost): void {
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
