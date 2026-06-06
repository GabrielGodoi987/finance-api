import { randomUUID } from 'node:crypto';
import { NotificationMapper } from '../../../../../../src/modules/notification/infra/mapper/notification.mapper';
import { NotificationAggregate } from '../../../../../../src/modules/notification/domain/notification.aggregate';

describe('NotificationMapper', () => {
  const makePrismaNotification = () => ({
    id: randomUUID(),
    userId: randomUUID(),
    type: 'WALLET_CREATED',
    title: 'Wallet Created',
    content: 'Your wallet has been created successfully',
    aggregateId: randomUUID(),
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-06-01'),
    readAt: null as Date | null,
  });

  describe('toAggregate', () => {
    it('should convert Prisma notification to NotificationAggregate', () => {
      const prismaNotification = makePrismaNotification();

      const aggregate = NotificationMapper.toAggregate(prismaNotification);

      expect(aggregate).toBeInstanceOf(NotificationAggregate);
      expect(aggregate.getId()).toBe(prismaNotification.id);
      expect(aggregate.getUserId()).toBe(prismaNotification.userId);
      expect(aggregate.getType()).toBe(prismaNotification.type);
      expect(aggregate.getTitle()).toBe(prismaNotification.title);
      expect(aggregate.getContent()).toBe(prismaNotification.content);
      expect(aggregate.getAggregateId()).toBe(prismaNotification.aggregateId);
      expect(aggregate.getReadAt()).toBe(prismaNotification.readAt);
      expect(aggregate.getCreatedAt()).toEqual(prismaNotification.createdAt);
      expect(aggregate.getUpdatedAt()).toEqual(prismaNotification.updatedAt);
    });

    it('should convert Prisma notification with readAt set', () => {
      const prismaNotification = makePrismaNotification();
      prismaNotification.readAt = new Date('2025-06-02');

      const aggregate = NotificationMapper.toAggregate(prismaNotification);

      expect(aggregate.isRead()).toBe(true);
      expect(aggregate.getReadAt()).toEqual(prismaNotification.readAt);
    });
  });

  describe('toPersistence', () => {
    it('should convert NotificationAggregate to persistence format', () => {
      const prismaNotification = makePrismaNotification();
      const aggregate = NotificationMapper.toAggregate(prismaNotification);

      const data = NotificationMapper.toPersistence(aggregate);

      expect(data).toEqual({
        id: aggregate.getId(),
        userId: aggregate.getUserId(),
        type: aggregate.getType(),
        title: aggregate.getTitle(),
        content: aggregate.getContent(),
        aggregateId: aggregate.getAggregateId(),
        readAt: aggregate.getReadAt(),
      });
    });
  });

  describe('round-trip', () => {
    it('should preserve data through toPersistence and toAggregate', () => {
      const prismaNotification = makePrismaNotification();

      const aggregate = NotificationMapper.toAggregate(prismaNotification);
      const persistenceData = NotificationMapper.toPersistence(aggregate);

      expect(persistenceData.id).toBe(prismaNotification.id);
      expect(persistenceData.userId).toBe(prismaNotification.userId);
      expect(persistenceData.type).toBe(prismaNotification.type);
      expect(persistenceData.title).toBe(prismaNotification.title);
      expect(persistenceData.content).toBe(prismaNotification.content);
      expect(persistenceData.aggregateId).toBe(prismaNotification.aggregateId);
      expect(persistenceData.readAt).toBe(prismaNotification.readAt);
    });
  });
});
