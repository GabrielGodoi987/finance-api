import { Inject, Injectable } from '@nestjs/common';
import { NotificationAggregate } from '../domain/notification.aggregate';
import { NotificationRepository } from '../domain/repositories/notification.repository';
import { FindNotificationDto } from '../dto/find-notification.dto';

@Injectable()
export class FindAllUseCase {
  constructor(
    @Inject('NotificationRepository')
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute(
    findNotificationDto: FindNotificationDto,
  ): Promise<NotificationAggregate[]> {
    const userNotifications =
      await this.notificationRepository.findManyByEmail(findNotificationDto);

    if (userNotifications.length == 0) {
      console.log(userNotifications);
      return [];
    }

    return userNotifications;
  }
}
