import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { NotificationAggregate } from '../domain/notification.aggregate';
import { NotificationRepository } from '../domain/repositories/notification.repository';

@Injectable()
export class FindOneByEmailUseCase {
  constructor(
    @Inject('NotificationRepository')
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute({
    id,
    email,
  }: {
    id: string;
    email: string;
  }): Promise<NotificationAggregate> {
    const findNotification = await this.notificationRepository.findByUnique({
      where: {
        id,
        user: {
          email,
        },
      },
    });

    if (!findNotification) {
      throw new BadRequestException('Notification does not exists');
    }

    return findNotification;
  }
}
