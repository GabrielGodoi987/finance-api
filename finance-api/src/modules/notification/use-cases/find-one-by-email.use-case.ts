import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    userId,
  }: {
    id: string;
    userId: string;
  }): Promise<NotificationAggregate> {
    const findNotification = await this.notificationRepository.findById(id);

    if (!findNotification) {
      throw new NotFoundException('Notification does not exists');
    }

    if (findNotification.getUserId() !== userId) {
      console.error(
        `user ${userId} is trying to reach user ${findNotification.getUserId()} account`,
      );
      throw new BadRequestException('Notification erro');
    }

    return findNotification;
  }
}
