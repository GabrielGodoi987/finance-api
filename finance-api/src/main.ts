import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { envs } from './commons/constants/envs.constants';
import { AppModule } from './modules/app.module';
import { InvalidCredentialsExceptionFilter } from './modules/IAM/exceptions/invalid-credentials/invalid-credentials.filter';
import { InvalidAccessTokenExceptionFilter } from './modules/IAM/exceptions/invalid-token/access/invalid-access-token.filter';
import { InvalidRefreshTokenExceptionFilter } from './modules/IAM/exceptions/invalid-token/refresh/invalid-refresh-token.filter';
import { TokenGenerationExceptionFilter } from './modules/IAM/exceptions/token-generation/token-generation.filter';
import { TokenNotProvidedExceptionFilter } from './modules/IAM/exceptions/token-not-provided/token-not-provided.filter';
import { RefreshValidationTokenExceptionFilter } from './modules/IAM/exceptions/validation-token-exception/refresh/refresh-token-validation.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Finance API')
    .setDescription('API para gerenciamento de assets e orders')
    .setVersion('1.0')
    .addApiKey(
      { type: 'apiKey', name: 'x-api-token', in: 'header' },
      'x-api-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(
    new InvalidCredentialsExceptionFilter(),
    new InvalidAccessTokenExceptionFilter(),
    new InvalidRefreshTokenExceptionFilter(),
    new TokenGenerationExceptionFilter(),
    new TokenNotProvidedExceptionFilter(),
    new RefreshValidationTokenExceptionFilter(),
  );

  await app.listen(envs.PORT ?? 3000);
}
bootstrap();
