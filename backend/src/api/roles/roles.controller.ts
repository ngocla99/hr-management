import { Permission, UserRole } from "@/constants/roles.constant";
import { CurrentUser } from "@/decorators/current-user.decorator";
import { ApiAuth } from "@/decorators/http.decorators";
import { RequirePermission, RequireRole } from "@/decorators/roles.decorator";
import { RolesGuard } from "@/guards/roles.guard";
import { Body, Controller, Get, Param, ParseEnumPipe, Post, UseGuards } from "@nestjs/common";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { AssignRoleReqDto } from "./dto/assign-role.req.dto";
import { AssignRoleResDto } from "./dto/assign-role.res.dto";
import { RolePermissionsResDto } from "./dto/role-permissions.res.dto";
import { UserRoleResDto } from "./dto/user-role.res.dto";
import { UsersByRoleResDto } from "./dto/users-by-role.res.dto";
import { RolesService } from "./roles.service";

@ApiTags("roles")
@Controller({
  path: "roles",
  version: "1",
})
@UseGuards(RolesGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @ApiAuth({
    type: RolePermissionsResDto,
    summary: "Get all available roles and their permissions",
  })
  @RequireRole(UserRole.ADMIN)
  getAllRoles(): RolePermissionsResDto[] {
    return this.rolesService.getAllRoles();
  }

  @Get(":role/permissions")
  @ApiAuth({
    type: RolePermissionsResDto,
    summary: "Get permissions for a specific role",
  })
  @ApiParam({ name: "role", enum: UserRole })
  @RequireRole(UserRole.HR_MANAGER)
  getRolePermissions(@Param("role", new ParseEnumPipe(UserRole)) role): RolePermissionsResDto {
    return this.rolesService.getRolePermissions(role);
  }

  @Post("assign")
  @ApiAuth({
    type: AssignRoleResDto,
    summary: "Assign role to a user",
  })
  @RequirePermission(Permission.ASSIGN_ROLES)
  async assignRole(
    @Body() assignRoleDto: AssignRoleReqDto,
    @CurrentUser("id") assignedByUserId: string,
  ): Promise<AssignRoleResDto> {
    return this.rolesService.assignRole(assignRoleDto.userId, assignRoleDto.role, assignedByUserId);
  }

  @Get("user/:userId")
  @ApiAuth({
    type: UserRoleResDto,
    summary: "Get user's role and permissions",
  })
  @ApiParam({ name: "userId", type: "String" })
  @RequirePermission(Permission.READ_USER)
  async getUserRole(@Param("userId") userId: string): Promise<UserRoleResDto> {
    return this.rolesService.getUserRole(userId);
  }

  @Get("user/:userId/can-assign/:role")
  @ApiAuth({
    summary: "Check if current user can assign specific role to target user",
  })
  @ApiParam({ name: "userId", type: "String" })
  @ApiParam({ name: "role", enum: UserRole })
  @RequirePermission(Permission.ASSIGN_ROLES)
  async canAssignRole(
    @Param("userId") userId: string,
    @Param("role", new ParseEnumPipe(UserRole)) role,
    @CurrentUser("id") assignerId: string,
  ): Promise<{ canAssign: boolean }> {
    const canAssign = await this.rolesService.canAssignRole(assignerId, role);
    return { canAssign };
  }

  @Get("users/by-role/:role")
  @ApiAuth({
    type: UsersByRoleResDto,
    summary: "Get all users with a specific role",
  })
  @ApiParam({ name: "role", enum: UserRole })
  @RequireRole(UserRole.HR_MANAGER)
  async getUsersByRole(
    @Param("role", new ParseEnumPipe(UserRole)) role,
  ): Promise<UsersByRoleResDto[]> {
    return this.rolesService.getUsersByRole(role);
  }

  @Get("me")
  @ApiAuth({
    type: UserRoleResDto,
    summary: "Get current user's role and permissions",
  })
  async getMyRole(@CurrentUser("id") userId: string): Promise<UserRoleResDto> {
    return this.rolesService.getUserRole(userId);
  }
}
