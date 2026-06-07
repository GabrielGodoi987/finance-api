import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../../../../../src/modules/prisma/prisma.service';
import { MarkAllAsReadUseCase } from '../../../../../src/modules/notification/use-cases/mark-all-as-read.use-case';
import { MarkReadDto } from '../../../../../src/modules/notification/dto/mark-read.dto';

describe('MarkAllAsReadUseCase - unit test', () => {
  let useCase: MarkAllAsReadUseCase;
  let mockNotificationRepository: any;
  let mockPrismaService: any;

  const makeFakeNotification = (overrides: any = {}) => ({
    getId: () => 'notif-1',
    getUserId: () => 'user-1',
    isRead: () => false,
    setReadAt: jest.fn(),
    ...overrides,
  });

  beforeEach(async () => {
    mockNotificationRepository = {
      findById: jest.fn(),
      findByUserId: jest.fn(),
      findByUserEmail: jest.fn(),
      save: jest.fn(),
      markAsRead: jest.fn(),
      markOneAsRead: jest.fn(),
      countUnreadByUserId: jest.fn(),
    };

    mockPrismaService = {
      runInTransaction: jest.fn().mockImplementation(async (fn: () => Promise<void>) => {
        await fn();
      }),
    };

    const module = await Test.createTestingModule({
      providers: [
        MarkAllAsReadUseCase,
        {
          provide: 'NotificationRepository',
          useValue: mockNotificationRepository,
        },
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    useCase = module.get(MarkAllAsReadUseCase);
  });

  it('should mark all valid and unread notifications as read', async () => {
    const notification1 = makeFakeNotification({ getId: () => 'id-1' });
    const notification2 = makeFakeNotification({ getId: () => 'id-2' });

    mockNotificationRepository.findById
      .mockResolvedValueOnce(notification1)
      .mockResolvedValueOnce(notification2);

    const dto: MarkReadDto = { ids: ['id-1', 'id-2'] };

    await useCase.execute({ userId: 'user-1', markReadDto: dto });

    expect(mockNotificationRepository.findById).toHaveBeenCalledTimes(2);
    expect(mockNotificationRepository.findById).toHaveBeenNthCalledWith(1, 'id-1');
    expect(mockNotificationRepository.findById).toHaveBeenNthCalledWith(2, 'id-2');
    expect(mockPrismaService.runInTransaction).toHaveBeenCalledTimes(1);
    expect(mockNotificationRepository.markAsRead).toHaveBeenCalledWith(['id-1', 'id-2']);
  });

  it('should skip notifications that are already read', async () => {
    const notification1 = makeFakeNotification({ getId: () => 'id-1' });
    const notification2 = makeFakeNotification({ getId: () => 'id-2', isRead: () => true });

    mockNotificationRepository.findById
      .mockResolvedValueOnce(notification1)
      .mockResolvedValueOnce(notification2);

    const dto: MarkReadDto = { ids: ['id-1', 'id-2'] };

    await useCase.execute({ userId: 'user-1', markReadDto: dto });

    expect(mockNotificationRepository.markAsRead).toHaveBeenCalledWith(['id-1']);
  });

  it('should return early when no valid IDs are provided', async () => {
    const notification1 = makeFakeNotification({ getId: () => 'id-1', isRead: () => true });

    mockNotificationRepository.findById.mockResolvedValue(notification1);

    const dto: MarkReadDto = { ids: ['id-1'] };

    await useCase.execute({ userId: 'user-1', markReadDto: dto });

    expect(mockNotificationRepository.markAsRead).not.toHaveBeenCalled();
    expect(mockPrismaService.runInTransaction).not.toHaveBeenCalled();
  });

  it('should throw NotFoundException when notification does not exist', async () => {
    mockNotificationRepository.findById.mockResolvedValue(null);

    const dto: MarkReadDto = { ids: ['invalid-id'] };

    await expect(
      useCase.execute({ userId: 'user-1', markReadDto: dto }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw BadRequestException when notification belongs to another user', async () => {
    mockNotificationRepository.findById.mockResolvedValue(
      makeFakeNotification({ getUserId: () => 'user-2' }),
    );

    const dto: MarkReadDto = { ids: ['id-1'] };

    await expect(
      useCase.execute({ userId: 'user-1', markReadDto: dto }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should process only valid IDs when some are invalid', async () => {
    mockNotificationRepository.findById
      .mockResolvedValueOnce(makeFakeNotification({ getId: () => 'id-1' }))
      .mockResolvedValueOnce(null);

    const dto: MarkReadDto = { ids: ['id-1', 'invalid-id'] };

    await expect(
      useCase.execute({ userId: 'user-1', markReadDto: dto }),
    ).rejects.toThrow(NotFoundException);

    expect(mockNotificationRepository.markAsRead).not.toHaveBeenCalled();
    expect(mockPrismaService.runInTransaction).not.toHaveBeenCalled();
  });
});
