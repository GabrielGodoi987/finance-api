import { UserRole } from '../../../../domain/value-objects/user-role.enum';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}
