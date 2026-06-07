import { Test } from '@nestjs/testing';
import { FindAllUseCase } from '../../../../../src/modules/notification/use-cases/find-all.use-case';

describe('FindAllUseCase - unit test', () => {
  let useCase: FindAllUseCase;
  const mockMotificationRepository: any = {
    findById: jest.fn(),
    findByUserId: jest.fn(),
    findByUserEmail: jest.fn(),
    save: jest.fn(),
    markAsRead: jest.fn(),
    markOneAsRead: jest.fn(),
    countUnreadByUserId: jest.fn(),
  };

  const makeFakeNotification = () => ({
    getId: () => 'abc',
    getUserId: () => 'user-1',
    getType: () => 'WALLET_CREATED',
    getTitle: () => 'Wallet Created',
    getContent: () => 'Your wallet has been created',
    getAggregateId: () => 'agg-1',
    getReadAt: () => null,
    isRead: () => false,
  });

  beforeEach(async () => {
    jest.clearAllMocks();

    const module = await Test.createTestingModule({
      providers: [
        FindAllUseCase,
        {
          provide: 'NotificationRepository',
          useValue: mockMotificationRepository,
        },
      ],
    }).compile();

    useCase = module.get(FindAllUseCase);
  });

  it('should return an empty array since there is no notifications', async () => {
    mockMotificationRepository.findByUserEmail.mockResolvedValue([]);

    const result = await useCase.execute({
      email: 'example@gmail.com',
      page: 0,
      limit: 10,
    });

    expect(mockMotificationRepository.findByUserEmail).toHaveBeenCalledTimes(1);
    expect(mockMotificationRepository.findByUserEmail).toHaveBeenCalledWith(
      'example@gmail.com',
    );
    expect(result).toEqual([]);
  });

  it('should return all the notification from the same user', async () => {
    const fakeNotifications = [makeFakeNotification(), makeFakeNotification()];
    mockMotificationRepository.findByUserEmail.mockResolvedValue(
      fakeNotifications,
    );

    const result = await useCase.execute({
      email: 'user@example.com',
      page: 0,
      limit: 10,
    });

    expect(mockMotificationRepository.findByUserEmail).toHaveBeenCalledWith(
      'user@example.com',
    );
    expect(result).toHaveLength(2);
    expect(result).toBe(fakeNotifications);
  });

  it('should return a single notification', async () => {
    const fakeNotifications = [makeFakeNotification()];
    mockMotificationRepository.findByUserEmail.mockResolvedValue(
      fakeNotifications,
    );

    const result = await useCase.execute({
      email: 'user@example.com',
      page: 0,
      limit: 10,
    });

    expect(mockMotificationRepository.findByUserEmail).toHaveBeenCalledWith(
      'user@example.com',
    );
    expect(result).toHaveLength(1);
    expect(result).toBe(fakeNotifications);
  });
});
