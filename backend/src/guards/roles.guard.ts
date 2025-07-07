import { JwtPayloadType } from "@/api/auth/types/jwt-payload.type";
import {
  Permission,
  UserRole,
  hasHigherOrEqualRole,
  hasPermission,
} from "@/constants/roles.constant";
import { PERMISSIONS_KEY, ROLES_KEY } from "@/decorators/roles.decorator";
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get required roles and permissions from metadata
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no roles or permissions are required, allow access
    if (!requiredRoles && !requiredPermissions) {
      return true;
    }

    // Get user from request
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const user: JwtPayloadType = request.user;

    if (!user || !user.role) {
      throw new ForbiddenException("User role not found");
    }
    console.log("🚀 ~ file: roles.guard.ts:19 ~ requiredRoles:", requiredRoles);
    console.log("🚀 ~ file: roles.guard.ts:19 ~ requiredPermissions:", user.role);
    console.log("🚀 ~ file: roles.guard.ts:43 ~ user:", user);

    // Check role requirements
    if (requiredRoles) {
      const hasRequiredRole = requiredRoles.some((role) => hasHigherOrEqualRole(user.role, role));

      if (!hasRequiredRole) {
        throw new ForbiddenException(`Insufficient role. Required: ${requiredRoles.join(", ")}`);
      }
    }

    // Check permission requirements
    if (requiredPermissions) {
      const hasRequiredPermission = requiredPermissions.some((permission) =>
        hasPermission(user.role, permission),
      );

      if (!hasRequiredPermission) {
        throw new ForbiddenException(
          `Insufficient permissions. Required: ${requiredPermissions.join(", ")}`,
        );
      }
    }

    return true;
  }
}
