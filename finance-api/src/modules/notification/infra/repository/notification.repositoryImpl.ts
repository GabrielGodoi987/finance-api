import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { NotificationAggregate } from '../../domain/notification.aggregate';
import { NotificationRepository } from '../../domain/repositories/notification.repository';
import { FindNotificationDto } from '../../dto/find-notification.dto';
import { NotificationMapper } from '../mapper/notification.mapper';

@Injectable()
export class NotificationRepositoryImpl implements NotificationRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findByUnique({
    where,
    select,
  }: {
    where: Prisma.NotificationWhereUniqueInput;
    select?: Prisma.NotificationSelect;
  }): Promise<NotificationAggregate | null> {
    const notification = await this.prisma.notification.findUnique({
      where,
      select,
    });

    if (!notification) {
      return null;
    }

    return NotificationMapper.toAggregate(notification);
  }

  async findManyByEmail(
    findNotificationDto: FindNotificationDto,
  ): Promise<NotificationAggregate[]> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        user: {
          email: findNotificationDto.email,
        },
      },
      skip: findNotificationDto.page,
      take: findNotificationDto.limit,
    });

    return notifications.map((n) => {
      return NotificationMapper.toAggregate(n);
    });
  }

  async findByUserId(userId: string): Promise<NotificationAggregate[]> {
    const rows = await this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((row) => NotificationMapper.toAggregate(row));
  }

  async save(
    notification: NotificationAggregate,
  ): Promise<NotificationAggregate> {
    const data = notification.toJSON();
    const row = await this.prisma.notification.create({ data });
    return NotificationMapper.toAggregate(row);
  }

  async markAsRead(ids: string[]): Promise<void> {
    await this.prisma.notification.updateMany({
      where: { id: { in: ids } },
      data: { readAt: new Date() },
    });
  }

  async markOneAsRead(id: string): Promise<void> {
    await this.prisma.notification.update({
      where: {
        id,
        readAt: null,
      },
      data: {
        readAt: new Date(),
      },
    });
  }

  async countUnreadByUserId(userId: string): Promise<number> {
    return this.prisma.notification.count({
      where: { userId, readAt: null },
    });
  }
}
