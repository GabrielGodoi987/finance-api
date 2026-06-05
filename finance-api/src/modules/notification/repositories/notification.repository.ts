import { NotificationAggregate } from '../domain/notification.aggregate';

export interface NotificationRepository {
  findByUserId(userId: string): Promise<NotificationAggregate[]>;
  save(notification: NotificationAggregate): Promise<NotificationAggregate>;
  markAsRead(ids: string[]): Promise<void>;
  countUnreadByUserId(userId: string): Promise<number>;
}
