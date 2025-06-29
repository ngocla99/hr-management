import { UserRepository } from "@/api/user/user.repository";
import { getRolePermissions, hasHigherOrEqualRole, UserRole } from "@/constants/roles.constant";
import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { AssignRoleResDto } from "./dto/assign-role.res.dto";
import { UserRoleResDto } from "./dto/user-role.res.dto";
import { UsersByRoleResDto } from "./dto/users-by-role.res.dto";

@Injectable()
export class RolesService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Get all available roles with their permissions
   */
  getAllRoles() {
    return Object.keys(UserRole).map((key) => ({
      role: UserRole[key as keyof typeof UserRole],
      permissions: getRolePermissions(UserRole[key as keyof typeof UserRole]),
    }));
  }

  /**
   * Get role permissions for a specific role
   */
  getRolePermissions(role: UserRole) {
    return {
      role,
      permissions: getRolePermissions(role),
    };
  }

  /**
   * Assign role to a user
   */
  async assignRole(userId: string, newRole: UserRole, assignedByUserId: string) {
    // Get the user who is assigning the role
    const assignedByUser = await this.userRepository.findById(assignedByUserId);
    if (!assignedByUser) {
      throw new NotFoundException("Assigning user not found");
    }

    // Get the target user
    const targetUser = await this.userRepository.findById(userId);
    if (!targetUser) {
      throw new NotFoundException("Target user not found");
    }

    // Check if the assigning user has permission to assign this role
    if (!hasHigherOrEqualRole(assignedByUser.role as UserRole, newRole)) {
      throw new ForbiddenException(
        `You cannot assign a role (${newRole}) that is higher than or equal to your own role (${assignedByUser.role})`,
      );
    }

    // Prevent users from assigning roles to users with higher roles
    if (!hasHigherOrEqualRole(assignedByUser.role as UserRole, targetUser.role as UserRole)) {
      throw new ForbiddenException(
        `You cannot modify roles for users with higher privileges than yours`,
      );
    }

    // Update the user's role
    const updatedUser = await this.userRepository.updateById(userId, { role: newRole });
    return plainToInstance(AssignRoleResDto, {
      userId: updatedUser!.id,
      previousRole: targetUser.role,
      newRole: newRole,
      assignedBy: assignedByUserId,
      assignedAt: new Date(),
    });
  }

  /**
   * Get user's current role and permissions
   */
  async getUserRole(userId: string): Promise<UserRoleResDto> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    return plainToInstance(UserRoleResDto, {
      userId: user.id,
      role: user.role,
      permissions: getRolePermissions(user.role as UserRole),
    });
  }

  /**
   * Check if a user can assign a specific role
   */
  async canAssignRole(assignerId: string, targetRole: UserRole): Promise<boolean> {
    const assigner = await this.userRepository.findById(assignerId);
    if (!assigner) {
      return false;
    }

    return hasHigherOrEqualRole(assigner.role as UserRole, targetRole);
  }

  /**
   * Get users by role
   */
  async getUsersByRole(role: UserRole): Promise<UsersByRoleResDto[]> {
    const users = await this.userRepository.findByRole(role);
    return plainToInstance(
      UsersByRoleResDto,
      users.map((user) => ({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      })),
    );
  }
}
