import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { NotificationAggregate } from '../../domain/notification.aggregate';
import { NotificationRepository } from '../../domain/repositories/notification.repository';
import { NotificationMapper } from '../mapper/notification.mapper';

@Injectable()
export class NotificationRepositoryImpl implements NotificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<NotificationAggregate | null> {
    const notification = await this.prisma.getClient().notification.findUnique({
      where: { id },
    });

    if (!notification) {
      return null;
    }

    return NotificationMapper.toAggregate(notification);
  }

  async findByUserEmail(email: string): Promise<NotificationAggregate[]> {
    const notifications = await this.prisma.getClient().notification.findMany({
      where: {
        user: {
          email,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return notifications.map((n) => NotificationMapper.toAggregate(n));
  }

  async findByUserId(userId: string): Promise<NotificationAggregate[]> {
    const rows = await this.prisma.getClient().notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((row) => NotificationMapper.toAggregate(row));
  }

  async save(
    notification: NotificationAggregate,
  ): Promise<NotificationAggregate> {
    const data = notification.toJSON();
    const row = await this.prisma.getClient().notification.create({ data });
    return NotificationMapper.toAggregate(row);
  }

  async markAsRead(ids: string[]): Promise<void> {
    await this.prisma.getClient().notification.updateMany({
      where: { id: { in: ids } },
      data: { readAt: new Date() },
    });
  }

  async markOneAsRead(id: string): Promise<void> {
    await this.prisma.getClient().notification.update({
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
    return this.prisma.getClient().notification.count({
      where: { userId, readAt: null },
    });
  }
}
