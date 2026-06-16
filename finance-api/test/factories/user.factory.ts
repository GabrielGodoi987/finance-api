import { v4 } from 'uuid';
import { UserRole } from '../../src/domain/value-objects/user-role.enum';
import { UserStatus } from '../../src/domain/value-objects/user-status.enum';
import { PrismaService } from '../../src/modules/prisma/prisma.service';
import { UserAggregate } from '../../src/modules/profile/profile-users/domain/user.aggregate';
import { UserMapper } from '../../src/modules/profile/profile-users/infra/mappers/user.mapper';

type createUserType = {
  name: string;
  email: string;
  document: string;
  password: string;
  role: UserRole;
  status: UserStatus;
};

export async function createManyUsers({
  prismaService,
  users,
}: {
  prismaService: PrismaService;
  users: createUserType[];
}) {
  const aggregates = users.map((user) =>
    UserAggregate.create(
      v4(),
      user.name,
      user.email,
      user.password,
      user.document,
      user.role,
    ),
  );

  const data = aggregates.map(UserMapper.toPersistence);

  await prismaService.user.createMany({
    data: data.map(({ wallet, ...user }) => ({
      ...user,
      status: user.status as import('@prisma/client').$Enums.UserStatus,
      role: user.role as import('@prisma/client').$Enums.UserRole,
    })),
  });

  await prismaService.wallet.createMany({
    data: data.map((user) => ({
      id: user.wallet.id,
      balance: user.wallet.balance,
      userId: user.id,
    })),
  });
}
