import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../../domain/value-objects/user-role.enum';

export const USER_ROLE_KEY = 'user-role';
export const UserRoleDecorator = (...args: UserRole[]) =>
  SetMetadata(USER_ROLE_KEY, args);
