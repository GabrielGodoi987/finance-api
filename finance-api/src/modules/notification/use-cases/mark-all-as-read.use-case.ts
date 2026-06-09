import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { NotificationAggregate } from '../domain/notification.aggregate';
import { NotificationRepository } from '../domain/repositories/notification.repository';
import { MarkReadDto } from '../dto/mark-read.dto';

@Injectable()
export class MarkAllAsReadUseCase {
  constructor(
    @Inject('NotificationRepository')
    private readonly notificationRepository: NotificationRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async execute({
    userId,
    markReadDto,
  }: {
    userId: string;
    markReadDto: MarkReadDto;
  }) {
    const validIds: string[] = [];
    for (const id of markReadDto.ids) {
      const notification = await this.verifyIfNotificationExists({
        id,
        userId,
      });

      if (notification && !notification.isRead()) {
        validIds.push(id);
      }
    }

    if (validIds.length === 0) return;

    await this.prismaService.runInTransaction(async () => {
      await this.notificationRepository.markAsRead(validIds);
    });
  }

  private async verifyIfNotificationExists({
    id,
    userId,
  }: {
    id: string;
    userId: string;
  }): Promise<NotificationAggregate | undefined> {
    const doesNotificationExists =
      await this.notificationRepository.findById(id);

    if (!doesNotificationExists) {
      throw new NotFoundException('Notification was not found');
    }

    if (doesNotificationExists.getUserId() !== userId) {
      console.error(
        `User ${userId} tried to access ${doesNotificationExists.getId()} notification from ${doesNotificationExists.getUserId()}`,
      );
      throw new BadRequestException('Notification erro');
    }

    return doesNotificationExists;
  }
}
