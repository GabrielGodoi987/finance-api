import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@prisma/client';

export const UserRoleDecorator = (...args: UserRole[]) =>
  SetMetadata('user-role', args);
