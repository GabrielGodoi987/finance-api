import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { TokenGenerationException } from './token-generation.exception';

@Catch(TokenGenerationException)
export class TokenGenerationExceptionFilter implements ExceptionFilter {
  catch(exception: TokenGenerationException, host: ArgumentsHost) {
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
