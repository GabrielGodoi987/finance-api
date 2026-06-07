import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { FindOneByEmailUseCase } from '../../../../../src/modules/notification/use-cases/find-one-by-email.use-case';

describe('FindOneByEmail - unit tests', () => {
  let useCase: FindOneByEmailUseCase;
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
        FindOneByEmailUseCase,
        {
          provide: 'NotificationRepository',
          useValue: mockNotificationRepository,
        },
      ],
    }).compile();

    useCase = module.get(FindOneByEmailUseCase);
  });

  it('should return notification when found and owned by user', async () => {
    const fakeNotification = { getId: () => 'abc', getUserId: () => 'user-1' } as any;
    mockNotificationRepository.findById.mockResolvedValue(fakeNotification);
    const result = await useCase.execute({
      id: 'abc',
      userId: 'user-1',
    });

    expect(result).toBe(fakeNotification);
    expect(mockNotificationRepository.findById).toHaveBeenCalledWith('abc');
  });

  it('should throw NotFoundException when notification does not exist', async () => {
    mockNotificationRepository.findById.mockResolvedValue(null);

    await expect(
      useCase.execute({ id: 'abc', userId: 'user-1' }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw BadRequestException when notification belongs to another user', async () => {
    const fakeNotification = { getId: () => 'abc', getUserId: () => 'user-2' } as any;
    mockNotificationRepository.findById.mockResolvedValue(fakeNotification);

    await expect(
      useCase.execute({ id: 'abc', userId: 'user-1' }),
    ).rejects.toThrow(BadRequestException);
  });
});
