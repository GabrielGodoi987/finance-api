import { Module } from '@nestjs/common';
import { NotificationHandler } from './handlers/notification.handler';
import { NotificationRepositoryImpl } from './infra/repository/notification.repositoryImpl';
import { FindAllUseCase } from './use-cases/findall.use-case';

@Module({
  providers: [
    NotificationHandler,
    {
      provide: 'NotificationRepository',
      useClass: NotificationRepositoryImpl,
    },
    NotificationRepositoryImpl,
    FindAllUseCase,
  ],
  exports: [NotificationRepositoryImpl],
})
export class NotificationModule {}
