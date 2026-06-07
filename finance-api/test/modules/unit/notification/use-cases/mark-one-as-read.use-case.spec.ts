import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { MarkOneAsReadUseCase } from '../../../../../src/modules/notification/use-cases/mark-one-as-read.use-case';

describe('MarkOneAsReadUseCase - unit test', () => {
  let useCase: MarkOneAsReadUseCase;
  let mockNotificationRepository: any;

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

    const module = await Test.createTestingModule({
      providers: [
        MarkOneAsReadUseCase,
        {
          provide: 'NotificationRepository',
          useValue: mockNotificationRepository,
        },
      ],
    }).compile();

    useCase = module.get(MarkOneAsReadUseCase);
  });

  it('should mark notification as read and save it', async () => {
    const fakeNotification = {
      getId: () => 'abc',
      getUserId: () => 'user-1',
      setReadAt: jest.fn(),
    };

    const savedNotification = { ...fakeNotification, readAt: new Date() };
    mockNotificationRepository.findById.mockResolvedValue(fakeNotification);
    mockNotificationRepository.save.mockResolvedValue(savedNotification);

    const result = await useCase.execute({
      email: 'user@example.com',
      notificationId: 'abc',
    });

    expect(mockNotificationRepository.findById).toHaveBeenCalledWith('abc');
    expect(fakeNotification.setReadAt).toHaveBeenCalled();
    expect(fakeNotification.setReadAt.mock.calls[0][0]).toBeInstanceOf(Date);
    expect(mockNotificationRepository.save).toHaveBeenCalledWith(fakeNotification);
    expect(result).toBe(savedNotification);
  });

  it('should throw NotFoundException when notification does not exist', async () => {
    mockNotificationRepository.findById.mockResolvedValue(null);

    await expect(
      useCase.execute({
        email: 'user@example.com',
        notificationId: 'nonexistent',
      }),
    ).rejects.toThrow(NotFoundException);
  });
});
