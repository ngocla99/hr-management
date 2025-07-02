import { DepartmentStatus } from "@/api/organization/entities/department.entity";
import { TeamStatus } from "@/api/organization/entities/team.entity";
import { applyMongoQueryOptions } from "@/utils/build-query-options";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { plainToInstance } from "class-transformer";
import { FilterQuery, Model, Types } from "mongoose";
import { CreateDepartmentReqDto } from "./dto/create-department.req.dto";
import { CreateTeamReqDto } from "./dto/create-team.req.dto";
import { DepartmentResDto } from "./dto/department.res.dto";
import { ListDepartmentsReqDto } from "./dto/list-departments.req.dto";
import { TeamResDto } from "./dto/team.res.dto";
import { UpdateDepartmentReqDto } from "./dto/update-department.req.dto";
import { UpdateTeamReqDto } from "./dto/update-team.req.dto";
import { DepartmentDocument } from "./entities/department.entity";
import { TeamDocument } from "./entities/team.entity";

@Injectable()
export class OrganizationRepository {
  constructor(
    @InjectModel("Department") public readonly departmentModel: Model<DepartmentDocument>,
    @InjectModel("Team") public readonly teamModel: Model<TeamDocument>,
  ) {}

  // Department Repository Methods
  async findDepartmentById(id: string | Types.ObjectId): Promise<DepartmentDocument | null> {
    return this.departmentModel.findById(id).exec();
  }

  async findDepartmentByName(name: string): Promise<DepartmentDocument | null> {
    return this.departmentModel.findOne({ name, deletedAt: null }).exec();
  }

  async createDepartment(
    data: CreateDepartmentReqDto & { createdBy: string },
  ): Promise<DepartmentResDto> {
    const department = new this.departmentModel(data);
    await department.save();
    return plainToInstance(DepartmentResDto, department.toObject());
  }

  async updateDepartment(
    id: string,
    data: UpdateDepartmentReqDto,
  ): Promise<DepartmentDocument | null> {
    return this.departmentModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async softDeleteDepartment(id: string): Promise<DepartmentResDto | null> {
    const department = await this.departmentModel
      .findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true })
      .exec();
    return plainToInstance(DepartmentResDto, department);
  }

  async findAllDepartments(options?: { select?: string[] }): Promise<DepartmentDocument[]> {
    const query = this.departmentModel.find({ deletedAt: null });
    return applyMongoQueryOptions(query, options).exec();
  }

  async findDepartmentsByFilter(
    filter: ListDepartmentsReqDto,
  ): Promise<[DepartmentDocument[], number]> {
    const query: FilterQuery<DepartmentDocument> = { deletedAt: null };

    if (filter.search) {
      query.name = { $regex: filter.search, $options: "i" };
    }

    if (filter.status) {
      query.status = filter.status;
    }

    if (filter.parentDepartment) {
      query.parentDepartment = filter.parentDepartment;
    }

    if (filter.manager) {
      query.manager = filter.manager;
    }

    const [departments, count] = await Promise.all([
      this.departmentModel
        .find(query)
        .skip((filter.page! - 1) * filter.limit!)
        .limit(filter.limit!)
        .sort({ createdAt: -1 })
        .exec(),
      this.departmentModel.countDocuments(query).exec(),
    ]);

    return [departments, count];
  }

  async findDepartmentsByStatus(status: DepartmentStatus): Promise<DepartmentDocument[]> {
    return this.departmentModel.find({ status, deletedAt: null }).exec();
  }

  async findChildDepartments(parentId: string): Promise<DepartmentDocument[]> {
    return this.departmentModel.find({ parentDepartment: parentId, deletedAt: null }).exec();
  }

  async addEmployeeToDepartment(
    departmentId: string,
    employeeId: string,
  ): Promise<DepartmentDocument | null> {
    return this.departmentModel
      .findByIdAndUpdate(departmentId, { $addToSet: { employees: employeeId } }, { new: true })
      .exec();
  }

  async removeEmployeeFromDepartment(
    departmentId: string,
    employeeId: string,
  ): Promise<DepartmentDocument | null> {
    return this.departmentModel
      .findByIdAndUpdate(departmentId, { $pull: { employees: employeeId } }, { new: true })
      .exec();
  }

  // Team Repository Methods
  async findTeamById(id: string | Types.ObjectId): Promise<TeamDocument | null> {
    return this.teamModel.findById(id).exec();
  }

  async findTeamByName(name: string, departmentId?: string): Promise<TeamDocument | null> {
    const query: FilterQuery<TeamDocument> = { name, deletedAt: null };
    if (departmentId) {
      query.department = departmentId;
    }
    return this.teamModel.findOne(query).exec();
  }

  async createTeam(data: CreateTeamReqDto & { createdBy: string }): Promise<TeamResDto> {
    const team = new this.teamModel(data);
    await team.save();
    return plainToInstance(TeamResDto, team.toObject());
  }

  async updateTeam(id: string, data: UpdateTeamReqDto): Promise<TeamDocument | null> {
    return this.teamModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async softDeleteTeam(id: string): Promise<TeamResDto | null> {
    const team = await this.teamModel
      .findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true })
      .exec();
    return plainToInstance(TeamResDto, team);
  }

  async findTeamsByDepartment(departmentId: string): Promise<TeamDocument[]> {
    return this.teamModel.find({ department: departmentId, deletedAt: null }).exec();
  }

  async findTeamsByStatus(status: TeamStatus): Promise<TeamDocument[]> {
    return this.teamModel.find({ status, deletedAt: null }).exec();
  }

  async addMemberToTeam(teamId: string, memberId: string): Promise<TeamDocument | null> {
    return this.teamModel
      .findByIdAndUpdate(teamId, { $addToSet: { members: memberId } }, { new: true })
      .exec();
  }

  async removeMemberFromTeam(teamId: string, memberId: string): Promise<TeamDocument | null> {
    return this.teamModel
      .findByIdAndUpdate(teamId, { $pull: { members: memberId } }, { new: true })
      .exec();
  }

  async findAllTeams(): Promise<TeamDocument[]> {
    return this.teamModel.find({ deletedAt: null }).exec();
  }
}
