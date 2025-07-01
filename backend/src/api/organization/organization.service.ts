import { UserRepository } from "@/api/user/user.repository";
import { OffsetPaginatedDto } from "@/common/dto/offset-pagination/paginated.dto";
import { Uuid } from "@/common/types/common.type";
import { ErrorCode } from "@/constants/error-code.constant";
import { ValidationException } from "@/exceptions/validation.exception";
import { paginate } from "@/utils/offset-pagination";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { CreateDepartmentReqDto } from "./dto/create-department.req.dto";
import { CreateTeamReqDto } from "./dto/create-team.req.dto";
import { DepartmentHierarchyResDto } from "./dto/department-hierarchy.res.dto";
import { DepartmentResDto } from "./dto/department.res.dto";
import { ListDepartmentsReqDto } from "./dto/list-departments.req.dto";
import { TeamResDto } from "./dto/team.res.dto";
import { UpdateDepartmentReqDto } from "./dto/update-department.req.dto";
import { UpdateTeamReqDto } from "./dto/update-team.req.dto";
import { DepartmentDocument } from "./entities/department.entity";
import { OrganizationRepository } from "./organization.repository";

@Injectable()
export class OrganizationService {
  private readonly logger = new Logger(OrganizationService.name);

  constructor(
    private readonly organizationRepository: OrganizationRepository,
    private readonly userRepository: UserRepository,
  ) {}

  // Department Service Methods
  async createDepartment(
    dto: CreateDepartmentReqDto,
    createdBy: string,
  ): Promise<DepartmentResDto> {
    const { name, manager, parentDepartment } = dto;

    // Check if department name is unique
    const existingDepartment = await this.organizationRepository.findDepartmentByName(name);
    if (existingDepartment) {
      throw new ValidationException(ErrorCode.E001);
    }

    // Validate manager exists if provided
    if (manager) {
      const managerUser = await this.userRepository.findById(manager);
      if (!managerUser) {
        throw new NotFoundException("Manager user not found");
      }
    }

    // Validate parent department exists if provided
    if (parentDepartment) {
      const parentDept = await this.organizationRepository.findDepartmentById(parentDepartment);
      if (!parentDept) {
        throw new NotFoundException("Parent department not found");
      }
    }

    const newDepartment = await this.organizationRepository.createDepartment({
      ...dto,
      createdBy,
    });

    this.logger.debug(`Created department: ${newDepartment.name}`);
    return newDepartment;
  }

  async findAllDepartments(
    reqDto: ListDepartmentsReqDto,
  ): Promise<OffsetPaginatedDto<DepartmentResDto>> {
    const [departments, metaDto] = await paginate<DepartmentDocument>(
      this.organizationRepository.departmentModel,
      reqDto,
      {
        skipCount: false,
        takeAll: false,
      },
    );
    return new OffsetPaginatedDto(plainToInstance(DepartmentResDto, departments), metaDto);
  }

  async findDepartmentById(id: Uuid): Promise<DepartmentResDto> {
    const department = await this.organizationRepository.findDepartmentById(id);
    if (!department) {
      throw new NotFoundException("Department not found");
    }
    return plainToInstance(DepartmentResDto, department);
  }

  async updateDepartment(id: Uuid, updateDto: UpdateDepartmentReqDto): Promise<DepartmentResDto> {
    const department = await this.organizationRepository.findDepartmentById(id);
    if (!department) {
      throw new NotFoundException("Department not found");
    }

    // Validate manager exists if provided
    if (updateDto.manager) {
      const managerUser = await this.userRepository.findById(updateDto.manager);
      if (!managerUser) {
        throw new NotFoundException("Manager user not found");
      }
    }

    // Validate parent department exists and prevent circular references
    if (updateDto.parentDepartment) {
      if (updateDto.parentDepartment === id) {
        throw new ValidationException(ErrorCode.E001, "Department cannot be its own parent");
      }

      const parentDept = await this.organizationRepository.findDepartmentById(
        updateDto.parentDepartment,
      );
      if (!parentDept) {
        throw new NotFoundException("Parent department not found");
      }
    }

    const updatedDepartment = await this.organizationRepository.updateDepartment(id, updateDto);
    return plainToInstance(DepartmentResDto, updatedDepartment);
  }

  async removeDepartment(id: Uuid): Promise<DepartmentResDto> {
    const department = await this.organizationRepository.findDepartmentById(id);
    if (!department) {
      throw new NotFoundException("Department not found");
    }

    // Check for child departments
    const childDepartments = await this.organizationRepository.findChildDepartments(id);
    if (childDepartments.length > 0) {
      throw new ValidationException(
        ErrorCode.E001,
        "Cannot delete department with child departments",
      );
    }

    // Check for teams in the department
    const teams = await this.organizationRepository.findTeamsByDepartment(id);
    if (teams.length > 0) {
      throw new ValidationException(ErrorCode.E001, "Cannot delete department with active teams");
    }

    const deletedDepartment = await this.organizationRepository.softDeleteDepartment(id);
    if (!deletedDepartment) {
      throw new NotFoundException("Department not found");
    }

    return deletedDepartment;
  }

  async getDepartmentHierarchy(): Promise<DepartmentHierarchyResDto[]> {
    const allDepartments = await this.organizationRepository.findAllDepartments();
    const allTeams = await this.organizationRepository.findAllTeams();

    // Group teams by department
    const teamsByDepartment = allTeams.reduce(
      (acc, team) => {
        const deptId = team.department.toString();
        acc[deptId] = (acc[deptId] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    // Get user names for managers
    const managerIds = allDepartments.map((dept) => dept.manager).filter(Boolean);
    const managers = await Promise.all(
      managerIds.map((id) => this.userRepository.findById(id.toString())),
    );
    const managerMap = managers.reduce(
      (acc, manager) => {
        if (manager) {
          acc[manager._id.toString()] = `${manager.firstName} ${manager.lastName}`;
        }
        return acc;
      },
      {} as Record<string, string>,
    );

    // Build hierarchy
    const departmentMap = new Map<string, DepartmentHierarchyResDto>();
    const rootDepartments: DepartmentHierarchyResDto[] = [];

    // First pass: create all department nodes
    allDepartments.forEach((dept) => {
      const deptId = dept._id.toString();
      const hierarchyDto: DepartmentHierarchyResDto = {
        id: deptId,
        name: dept.name,
        description: dept.description,
        manager: dept.manager?.toString(),
        managerName: dept.manager ? managerMap[dept.manager.toString()] : undefined,
        employeeCount: dept.employees.length,
        teamCount: teamsByDepartment[deptId] || 0,
        status: dept.status,
        children: [],
      };
      departmentMap.set(deptId, hierarchyDto);
    });

    // Second pass: build hierarchy
    allDepartments.forEach((dept) => {
      const deptId = dept._id.toString();
      const deptDto = departmentMap.get(deptId)!;

      if (dept.parentDepartment) {
        const parentId = dept.parentDepartment.toString();
        const parentDto = departmentMap.get(parentId);
        if (parentDto) {
          parentDto.children.push(deptDto);
        } else {
          // Parent not found, treat as root
          rootDepartments.push(deptDto);
        }
      } else {
        rootDepartments.push(deptDto);
      }
    });

    return rootDepartments;
  }

  // Team Service Methods
  async createTeam(dto: CreateTeamReqDto, createdBy: string): Promise<TeamResDto> {
    const { name, department, teamLead } = dto;

    // Validate department exists
    const departmentDoc = await this.organizationRepository.findDepartmentById(department);
    if (!departmentDoc) {
      throw new NotFoundException("Department not found");
    }

    // Check if team name is unique within the department
    const existingTeam = await this.organizationRepository.findTeamByName(name, department);
    if (existingTeam) {
      throw new ValidationException(ErrorCode.E001, "Team name already exists in this department");
    }

    // Validate team lead exists if provided
    if (teamLead) {
      const teamLeadUser = await this.userRepository.findById(teamLead);
      if (!teamLeadUser) {
        throw new NotFoundException("Team lead user not found");
      }
    }

    const newTeam = await this.organizationRepository.createTeam({
      ...dto,
      createdBy,
    });

    this.logger.debug(`Created team: ${newTeam.name} in department: ${department}`);
    return newTeam;
  }

  async findTeamById(id: Uuid): Promise<TeamResDto> {
    const team = await this.organizationRepository.findTeamById(id);
    if (!team) {
      throw new NotFoundException("Team not found");
    }
    return plainToInstance(TeamResDto, team);
  }

  async findTeamsByDepartment(departmentId: Uuid): Promise<TeamResDto[]> {
    const teams = await this.organizationRepository.findTeamsByDepartment(departmentId);
    return plainToInstance(TeamResDto, teams);
  }

  async updateTeam(id: Uuid, updateDto: UpdateTeamReqDto): Promise<TeamResDto> {
    const team = await this.organizationRepository.findTeamById(id);
    if (!team) {
      throw new NotFoundException("Team not found");
    }

    // Validate department exists if provided
    if (updateDto.department) {
      const departmentDoc = await this.organizationRepository.findDepartmentById(
        updateDto.department,
      );
      if (!departmentDoc) {
        throw new NotFoundException("Department not found");
      }
    }

    // Validate team lead exists if provided
    if (updateDto.teamLead) {
      const teamLeadUser = await this.userRepository.findById(updateDto.teamLead);
      if (!teamLeadUser) {
        throw new NotFoundException("Team lead user not found");
      }
    }

    const updatedTeam = await this.organizationRepository.updateTeam(id, updateDto);
    return plainToInstance(TeamResDto, updatedTeam);
  }

  async removeTeam(id: Uuid): Promise<TeamResDto> {
    const team = await this.organizationRepository.findTeamById(id);
    if (!team) {
      throw new NotFoundException("Team not found");
    }

    const deletedTeam = await this.organizationRepository.softDeleteTeam(id);
    if (!deletedTeam) {
      throw new NotFoundException("Team not found");
    }

    return deletedTeam;
  }

  async addTeamMember(teamId: Uuid, userId: Uuid): Promise<TeamResDto> {
    const team = await this.organizationRepository.findTeamById(teamId);
    if (!team) {
      throw new NotFoundException("Team not found");
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    // Check if user is already a member
    if (team.members.some((memberId) => memberId.toString() === userId)) {
      throw new ValidationException(ErrorCode.E001, "User is already a team member");
    }

    const updatedTeam = await this.organizationRepository.addMemberToTeam(teamId, userId);
    return plainToInstance(TeamResDto, updatedTeam);
  }

  async removeTeamMember(teamId: Uuid, userId: Uuid): Promise<TeamResDto> {
    const team = await this.organizationRepository.findTeamById(teamId);
    if (!team) {
      throw new NotFoundException("Team not found");
    }

    const updatedTeam = await this.organizationRepository.removeMemberFromTeam(teamId, userId);
    return plainToInstance(TeamResDto, updatedTeam);
  }
}
