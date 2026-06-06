import { Test } from '@nestjs/testing';
import { FindAllUseCase } from '../../../../../src/modules/notification/use-cases/findall.use-case';

describe('FindAllUseCase - unit test', () => {
  let useCase: FindAllUseCase;
  const mockMotificationRepository: any = {
    findByUnique: jest.fn(),
    findByUserId: jest.fn(),
    findManyByEmail: jest.fn(),
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
    mockMotificationRepository.findManyByEmail.mockResolvedValue([]);

    const result = await useCase.execute({
      email: 'example@gmail.com',
      page: 0,
      limit: 10,
    });

    expect(mockMotificationRepository.findManyByEmail).toHaveBeenCalledTimes(1);
    expect(mockMotificationRepository.findManyByEmail).toHaveBeenCalledWith({
      email: 'example@gmail.com',
      page: 0,
      limit: 10,
    });
    expect(result).toEqual([]);
  });

  it('should return all the notification from the same user - with pagination', async () => {
    const fakeNotifications = [makeFakeNotification(), makeFakeNotification()];
    mockMotificationRepository.findManyByEmail.mockResolvedValue(
      fakeNotifications,
    );

    const result = await useCase.execute({
      email: 'user@example.com',
      page: 2,
      limit: 20,
    });

    expect(mockMotificationRepository.findManyByEmail).toHaveBeenCalledWith({
      email: 'user@example.com',
      page: 2,
      limit: 20,
    });
    expect(result).toHaveLength(2);
    expect(result).toBe(fakeNotifications);
  });

  it('should return all the notification from the same user - without pagination', async () => {
    const fakeNotifications = [makeFakeNotification()];
    mockMotificationRepository.findManyByEmail.mockResolvedValue(
      fakeNotifications,
    );

    const result = await useCase.execute({
      email: 'user@example.com',
      page: 0,
      limit: 10,
    });

    expect(mockMotificationRepository.findManyByEmail).toHaveBeenCalledWith({
      email: 'user@example.com',
      page: 0,
      limit: 10,
    });
    expect(result).toHaveLength(1);
    expect(result).toBe(fakeNotifications);
  });
});
