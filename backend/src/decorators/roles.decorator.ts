import { Permission, UserRole } from "@/constants/roles.constant";
import { SetMetadata } from "@nestjs/common";

// Keys for metadata
export const ROLES_KEY = "roles";
export const PERMISSIONS_KEY = "permissions";

// Decorator to require specific roles
export const RequireRoles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

// Decorator to require specific permissions
export const RequirePermissions = (...permissions: Permission[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);

// Decorator to allow only higher hierarchy roles
export const RequireRole = (role: UserRole) => SetMetadata(ROLES_KEY, [role]);

// Decorator to require specific permission
export const RequirePermission = (permission: Permission) =>
  SetMetadata(PERMISSIONS_KEY, [permission]);
