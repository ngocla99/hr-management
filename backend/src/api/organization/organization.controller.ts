import { OffsetPaginatedDto } from "@/common/dto/offset-pagination/paginated.dto";
import { Uuid } from "@/common/types/common.type";
import { Permission } from "@/constants/roles.constant";
import { CurrentUser } from "@/decorators/current-user.decorator";
import { ApiAuth } from "@/decorators/http.decorators";
import { RequirePermission } from "@/decorators/roles.decorator";
import { RolesGuard } from "@/guards/roles.guard";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { AddTeamMemberReqDto } from "./dto/add-team-member.req.dto";
import { CreateDepartmentReqDto } from "./dto/create-department.req.dto";
import { CreateTeamReqDto } from "./dto/create-team.req.dto";
import { DepartmentHierarchyResDto } from "./dto/department-hierarchy.res.dto";
import { DepartmentResDto } from "./dto/department.res.dto";
import { ListDepartmentsReqDto } from "./dto/list-departments.req.dto";
import { TeamResDto } from "./dto/team.res.dto";
import { UpdateDepartmentReqDto } from "./dto/update-department.req.dto";
import { UpdateTeamReqDto } from "./dto/update-team.req.dto";
import { OrganizationService } from "./organization.service";

@ApiTags("organization")
@Controller({
  path: "organization",
  version: "1",
})
@UseGuards(RolesGuard)
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  // Department Endpoints
  @Post("departments")
  @ApiAuth({
    type: DepartmentResDto,
    summary: "Create department",
    statusCode: HttpStatus.CREATED,
  })
  @RequirePermission(Permission.CREATE_DEPARTMENT)
  async createDepartment(
    @Body() createDepartmentDto: CreateDepartmentReqDto,
    @CurrentUser("id") currentUserId: Uuid,
  ): Promise<DepartmentResDto> {
    return await this.organizationService.createDepartment(createDepartmentDto, currentUserId);
  }

  @Get("departments")
  @ApiAuth({
    type: DepartmentResDto,
    summary: "List departments",
    isPaginated: true,
  })
  @RequirePermission(Permission.READ_DEPARTMENT)
  async findAllDepartments(
    @Query() reqDto: ListDepartmentsReqDto,
  ): Promise<OffsetPaginatedDto<DepartmentResDto>> {
    return await this.organizationService.findAllDepartments(reqDto);
  }

  @Get("departments/hierarchy")
  @ApiAuth({
    type: DepartmentHierarchyResDto,
    summary: "Get department hierarchy",
  })
  @RequirePermission(Permission.READ_DEPARTMENT)
  async getDepartmentHierarchy(): Promise<DepartmentHierarchyResDto[]> {
    return await this.organizationService.getDepartmentHierarchy();
  }

  @Get("departments/:id")
  @ApiAuth({
    type: DepartmentResDto,
    summary: "Find department by id",
  })
  @ApiParam({ name: "id", type: "String" })
  @RequirePermission(Permission.READ_DEPARTMENT)
  async findDepartment(@Param("id", ParseUUIDPipe) id: Uuid): Promise<DepartmentResDto> {
    return await this.organizationService.findDepartmentById(id);
  }

  @Put("departments/:id")
  @ApiAuth({
    type: DepartmentResDto,
    summary: "Update department",
  })
  @ApiParam({ name: "id", type: "String" })
  @RequirePermission(Permission.UPDATE_DEPARTMENT)
  async updateDepartment(
    @Param("id", ParseUUIDPipe) id: Uuid,
    @Body() updateDepartmentDto: UpdateDepartmentReqDto,
  ): Promise<DepartmentResDto> {
    return await this.organizationService.updateDepartment(id, updateDepartmentDto);
  }

  @Delete("departments/:id")
  @ApiAuth({
    type: DepartmentResDto,
    summary: "Delete department",
  })
  @ApiParam({ name: "id", type: "String" })
  @RequirePermission(Permission.DELETE_DEPARTMENT)
  async removeDepartment(@Param("id", ParseUUIDPipe) id: Uuid): Promise<DepartmentResDto> {
    return await this.organizationService.removeDepartment(id);
  }

  // Team Endpoints
  @Post("teams")
  @ApiAuth({
    type: TeamResDto,
    summary: "Create team",
    statusCode: HttpStatus.CREATED,
  })
  @RequirePermission(Permission.CREATE_DEPARTMENT) // Using department permission for teams
  async createTeam(
    @Body() createTeamDto: CreateTeamReqDto,
    @CurrentUser("id") currentUserId: Uuid,
  ): Promise<TeamResDto> {
    return await this.organizationService.createTeam(createTeamDto, currentUserId);
  }

  @Get("teams/:id")
  @ApiAuth({
    type: TeamResDto,
    summary: "Find team by id",
  })
  @ApiParam({ name: "id", type: "String" })
  @RequirePermission(Permission.READ_DEPARTMENT)
  async findTeam(@Param("id", ParseUUIDPipe) id: Uuid): Promise<TeamResDto> {
    return await this.organizationService.findTeamById(id);
  }

  @Get("departments/:departmentId/teams")
  @ApiAuth({
    type: TeamResDto,
    summary: "Find teams by department",
  })
  @ApiParam({ name: "departmentId", type: "String" })
  @RequirePermission(Permission.READ_DEPARTMENT)
  async findTeamsByDepartment(
    @Param("departmentId", ParseUUIDPipe) departmentId: Uuid,
  ): Promise<TeamResDto[]> {
    return await this.organizationService.findTeamsByDepartment(departmentId);
  }

  @Put("teams/:id")
  @ApiAuth({
    type: TeamResDto,
    summary: "Update team",
  })
  @ApiParam({ name: "id", type: "String" })
  @RequirePermission(Permission.UPDATE_DEPARTMENT)
  async updateTeam(
    @Param("id", ParseUUIDPipe) id: Uuid,
    @Body() updateTeamDto: UpdateTeamReqDto,
  ): Promise<TeamResDto> {
    return await this.organizationService.updateTeam(id, updateTeamDto);
  }

  @Delete("teams/:id")
  @ApiAuth({
    type: TeamResDto,
    summary: "Delete team",
  })
  @ApiParam({ name: "id", type: "String" })
  @RequirePermission(Permission.DELETE_DEPARTMENT)
  async removeTeam(@Param("id", ParseUUIDPipe) id: Uuid): Promise<TeamResDto> {
    return await this.organizationService.removeTeam(id);
  }

  // Team Member Management
  @Post("teams/:teamId/members")
  @ApiAuth({
    type: TeamResDto,
    summary: "Add member to team",
  })
  @ApiParam({ name: "teamId", type: "String" })
  @RequirePermission(Permission.UPDATE_DEPARTMENT)
  async addTeamMember(
    @Param("teamId", ParseUUIDPipe) teamId: Uuid,
    @Body() addMemberDto: AddTeamMemberReqDto,
  ): Promise<TeamResDto> {
    return await this.organizationService.addTeamMember(teamId, addMemberDto.userId);
  }

  @Delete("teams/:teamId/members/:userId")
  @ApiAuth({
    type: TeamResDto,
    summary: "Remove member from team",
  })
  @ApiParam({ name: "teamId", type: "String" })
  @ApiParam({ name: "userId", type: "String" })
  @RequirePermission(Permission.UPDATE_DEPARTMENT)
  async removeTeamMember(
    @Param("teamId", ParseUUIDPipe) teamId: Uuid,
    @Param("userId", ParseUUIDPipe) userId: Uuid,
  ): Promise<TeamResDto> {
    return await this.organizationService.removeTeamMember(teamId, userId);
  }
}
