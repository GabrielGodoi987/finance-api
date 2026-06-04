import { randomUUID } from 'node:crypto';
import { UserMapper } from '../../../../../../../src/modules/profile/profile-users/infra/mappers/user.mapper';
import { UserAggregate } from '../../../../../../../src/modules/profile/profile-users/domain/user.aggregate';

describe('UserMapper', () => {
  const makePrismaUser = () => ({
    id: randomUUID(),
    name: 'John Doe',
    email: 'john@example.com',
    password: 'hashed-password',
    document: '12345678901',
    role: 'USER',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-06-01'),
    wallet: {
      id: randomUUID(),
      balance: 0,
      userId: randomUUID(),
    },
  });

  describe('toAggregate', () => {
    it('should convert Prisma user to UserAggregate', () => {
      const prismaUser = makePrismaUser();

      const aggregate = UserMapper.toAggregate(prismaUser);

      expect(aggregate).toBeInstanceOf(UserAggregate);
      expect(aggregate.getId()).toBe(prismaUser.id);
      expect(aggregate.getName()).toBe(prismaUser.name);
      expect(aggregate.getEmail()).toBe(prismaUser.email);
      expect(aggregate.getPassword()).toBe(prismaUser.password);
      expect(aggregate.getDocument()).toBe(prismaUser.document);
      expect(aggregate.getRole()).toBe(prismaUser.role);
      expect(aggregate.getWallet().getId()).toBe(prismaUser.wallet.id);
      expect(aggregate.getWallet().getBalance()).toBe(prismaUser.wallet.balance);
    });

    it('should create wallet when Prisma user has no wallet', () => {
      const prismaUser = makePrismaUser();
      const prismaUserWithoutWallet = { ...prismaUser, wallet: null };

      const aggregate = UserMapper.toAggregate(prismaUserWithoutWallet);

      expect(aggregate.getWallet()).toBeDefined();
      expect(aggregate.getWallet().getBalance()).toBe(0);
    });
  });

  describe('toPersistence', () => {
    it('should convert UserAggregate to persistence format', () => {
      const prismaUser = makePrismaUser();
      const aggregate = UserMapper.toAggregate(prismaUser);

      const data = UserMapper.toPersistence(aggregate);

      expect(data).toEqual({
        id: aggregate.getId(),
        name: aggregate.getName(),
        email: aggregate.getEmail(),
        password: aggregate.getPassword(),
        document: aggregate.getDocument(),
        role: aggregate.getRole(),
        wallet: {
          id: aggregate.getWallet().getId(),
          balance: aggregate.getWallet().getBalance(),
        },
      });
    });
  });

  describe('round-trip', () => {
    it('should preserve data through toPersistence and toAggregate', () => {
      const prismaUser = makePrismaUser();

      const aggregate = UserMapper.toAggregate(prismaUser);
      const persistenceData = UserMapper.toPersistence(aggregate);

      expect(persistenceData.id).toBe(prismaUser.id);
      expect(persistenceData.name).toBe(prismaUser.name);
      expect(persistenceData.email).toBe(prismaUser.email);
      expect(persistenceData.password).toBe(prismaUser.password);
      expect(persistenceData.document).toBe(prismaUser.document);
      expect(persistenceData.role).toBe(prismaUser.role);
      expect(persistenceData.wallet.id).toBe(prismaUser.wallet.id);
      expect(persistenceData.wallet.balance).toBe(prismaUser.wallet.balance);
    });
  });
});
