import { Module } from '@nestjs/common';
import { NotificationHandler } from './handlers/notification.handler';
import { NotificationRepositoryImpl } from './infra/repository/notification.repositoryImpl';

@Module({
  providers: [
    NotificationHandler,
    {
      provide: 'NotificationRepository',
      useClass: NotificationRepositoryImpl,
    },
    NotificationRepositoryImpl,
  ],
  exports: [NotificationRepositoryImpl],
})
export class NotificationModule {}
