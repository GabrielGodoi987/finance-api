import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { FindOneByEmailUseCase } from '../../../../../src/modules/notification/use-cases/find-one-by-email.use-case';

describe('FindOneByEmail - unit tests', () => {
  let useCase: FindOneByEmailUseCase;
  let mockNotificationRepository: any;

  beforeEach(async () => {
    mockNotificationRepository = {
      findByUnique: jest.fn(),
      findByUserId: jest.fn(),
      findManyByEmail: jest.fn(),
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

  it('should return notification when found', async () => {
    const fakeNotification = { getId: () => 'abc' } as any;
    mockNotificationRepository.findByUnique.mockResolvedValue(fakeNotification);
    const result = await useCase.execute({
      id: 'abc',
      email: 'test@test.com',
    });

    expect(result).toBe(fakeNotification);
    expect(mockNotificationRepository.findByUnique).toHaveBeenCalledWith({
      where: { id: 'abc', user: { email: 'test@test.com' } },
    });
  });

  it('should throw BadRequestException when not found', async () => {
    mockNotificationRepository.findByUnique.mockResolvedValue(null);

    await expect(
      useCase.execute({ id: 'abc', email: 'test@test.com' }),
    ).rejects.toThrow(BadRequestException);
  });
});
