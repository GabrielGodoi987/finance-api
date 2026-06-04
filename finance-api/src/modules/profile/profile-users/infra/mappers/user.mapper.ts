import { UserAggregate } from '../../domain/user.aggregate';

type PrismaUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  document: string;
  role: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  wallet?: { id: string; balance: number; userId: string } | null;
};

export class UserMapper {
  static toAggregate(user: PrismaUser): UserAggregate {
    return UserAggregate.fromPersistence({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      document: user.document,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      wallet: user.wallet
        ? {
            id: user.wallet.id,
            balance: user.wallet.balance,
            userId: user.wallet.userId,
          }
        : undefined,
    });
  }

  static toPersistence(aggregate: UserAggregate) {
    return {
      id: aggregate.getId(),
      name: aggregate.getName(),
      email: aggregate.getEmail(),
      password: aggregate.getPassword(),
      document: aggregate.getDocument(),
      role: aggregate.getRole(),
      status: aggregate.getStatus(),
      wallet: {
        id: aggregate.getWallet().getId(),
        balance: aggregate.getWallet().getBalance(),
      },
    };
  }
}
