import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { NotificationAggregate } from '../../domain/notification.aggregate';
import { NotificationRepository } from '../../repositories/notification.repository';

@Injectable()
export class NotificationRepositoryImpl implements NotificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserId(userId: string): Promise<NotificationAggregate[]> {
    const rows = await this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((row) => NotificationAggregate.fromPersistence(row));
  }

  async save(notification: NotificationAggregate): Promise<NotificationAggregate> {
    const data = notification.toJSON();
    const row = await this.prisma.notification.create({ data });
    return NotificationAggregate.fromPersistence(row);
  }

  async markAsRead(ids: string[]): Promise<void> {
    await this.prisma.notification.updateMany({
      where: { id: { in: ids } },
      data: { readAt: new Date() },
    });
  }

  async countUnreadByUserId(userId: string): Promise<number> {
    return this.prisma.notification.count({
      where: { userId, readAt: null },
    });
  }
}
