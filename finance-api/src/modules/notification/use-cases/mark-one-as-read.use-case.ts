import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NotificationRepository } from '../domain/repositories/notification.repository';

@Injectable()
export class MarkOneAsReadUseCase {
  constructor(
    @Inject('NotificationRepository')
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute({
    email,
    notificationId,
  }: {
    email: string;
    notificationId: string;
  }) {
    const doesNotificationExists =
      await this.notificationRepository.findByUnique({
        where: {
          id: notificationId,
          user: {
            email,
          },
        },
      });

    if (!doesNotificationExists) {
      throw new NotFoundException('Notification was not found');
    }

    doesNotificationExists.setReadAt(new Date());

    return await this.notificationRepository.save(doesNotificationExists);
  }
}
