import { Module } from '@nestjs/common';
import { NotificationHandler } from './handlers/notification.handler';
import { NotificationRepositoryImpl } from './infra/repository/notification.repositoryImpl';
import { NotificationController } from './notification.controller';
import { FindOneByEmailUseCase } from './use-cases/find-one-by-email.use-case';
import { FindAllUseCase } from './use-cases/find-all.use-case';
import { MarkAllAsReadUseCase } from './use-cases/mark-all-as-read.use-case';
import { MarkOneAsReadUseCase } from './use-cases/mark-one-as-read.use-case';

@Module({
  controllers: [NotificationController],
  providers: [
    NotificationHandler,
    {
      provide: 'NotificationRepository',
      useClass: NotificationRepositoryImpl,
    },
    NotificationRepositoryImpl,
    FindAllUseCase,
    FindOneByEmailUseCase,
    MarkAllAsReadUseCase,
    MarkOneAsReadUseCase,
  ],
  exports: [NotificationRepositoryImpl],
})
export class NotificationModule {}
