import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { USER_ROLE_KEY } from '../../../commons/decorators/user-role/user-role.decorator';
import { UserRole } from '../../../domain/value-objects/user-role.enum';

type RequestWithUser = {
  user?: {
    role?: UserRole | string;
    roles?: Array<UserRole | string>;
  };
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Reflector reads the metadata written by @UserRoleDecorator on controllers or handlers.
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      USER_ROLE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const userRoles = this.getUserRoles(request);

    return requiredRoles.some((role) => userRoles.includes(role));
  }

  private getUserRoles(request: RequestWithUser): string[] {
    if (!request.user) {
      return [];
    }

    if (request.user.roles) {
      return request.user.roles;
    }

    return request.user.role ? [request.user.role] : [];
  }
}
