import { NotificationAggregate } from '../notification.aggregate';

export interface NotificationRepository {
  findById(id: string): Promise<NotificationAggregate | null>;
  findByUserId(userId: string): Promise<NotificationAggregate[]>;
  findByUserEmail(email: string): Promise<NotificationAggregate[]>;
  save(notification: NotificationAggregate): Promise<NotificationAggregate>;
  markAsRead(ids: string[]): Promise<void>;
  markOneAsRead(id: string): Promise<void>;
  countUnreadByUserId(userId: string): Promise<number>;
}
