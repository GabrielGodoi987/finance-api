import { Notification } from '@prisma/client';
import { NotificationAggregate } from '../../domain/notification.aggregate';

export class NotificationMapper {
  static toAggregate(notification: Notification): NotificationAggregate {
    return new NotificationAggregate(
      notification.id,
      notification.userId,
      notification.type,
      notification.title,
      notification.content,
      notification.aggregateId,
      notification.readAt,
    );
  }

  static toPersistence(aggregate: NotificationAggregate) {
    return {
      id: aggregate.getId(),
      userId: aggregate.getUserId(),
      type: aggregate.getType(),
      title: aggregate.getTitle(),
      content: aggregate.getContent(),
      aggregateId: aggregate.getAggregateId(),
      readAt: aggregate.getReadAt(),
    };
  }
}
