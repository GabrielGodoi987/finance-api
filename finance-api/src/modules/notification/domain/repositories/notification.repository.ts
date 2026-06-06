import { Prisma } from '@prisma/client';
import { FindNotificationDto } from '../../dto/find-notification.dto';
import { NotificationAggregate } from '../notification.aggregate';

export interface NotificationRepository {
  findByUnique({
    where,
    select,
  }: {
    where: Prisma.NotificationWhereUniqueInput;
    select?: Prisma.NotificationSelect;
  }): Promise<NotificationAggregate | null>;
  findByUserId(userId: string): Promise<NotificationAggregate[]>;
  findManyByEmail(
    findNotificationDto: FindNotificationDto & { email: string },
  ): Promise<NotificationAggregate[]>;
  save(notification: NotificationAggregate): Promise<NotificationAggregate>;
  markAsRead(ids: string[]): Promise<void>;
  markOneAsRead(id: string): Promise<void>;
  countUnreadByUserId(userId: string): Promise<number>;
}
