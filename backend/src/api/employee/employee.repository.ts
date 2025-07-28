import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateEmployeeReqDto } from "./dto/create-employee.req.dto";
import { EmployeeStatsDto } from "./dto/employee-stats.res.dto";
import { UpdateEmployeeReqDto } from "./dto/update-employee.req.dto";
import { Employee, EmployeeDocument } from "./entities/employee.entity";

@Injectable()
export class EmployeeRepository {
  constructor(@InjectModel(Employee.name) public readonly model: Model<EmployeeDocument>) {}

  async create(employeeData: CreateEmployeeReqDto): Promise<EmployeeDocument> {
    const employee = new this.model({
      ...employeeData,
      userId: new Types.ObjectId(employeeData.userId),
    });

    const savedEmployee = await employee.save();
    return savedEmployee;
  }

  async findById(id: string): Promise<EmployeeDocument | null> {
    return await this.model
      .findById(id)
      .populate(
        "userId",
        "id firstName lastName email avatar phoneNumber username role status gender age dateOfBirth",
      )
      .exec();
  }

  async findByUserId(userId: string): Promise<EmployeeDocument | null> {
    return await this.model
      .findOne({ userId: new Types.ObjectId(userId) })
      .populate("userId", "firstName lastName email avatar phoneNumber username role status")
      .exec();
  }

  async findByEmployeeNumber(employeeNumber: string): Promise<EmployeeDocument | null> {
    return await this.model
      .findOne({ employeeNumber: employeeNumber.toUpperCase() })
      .populate("userId", "firstName lastName email avatar phoneNumber username role status")
      .exec();
  }

  async updateById(id: string, updateData: UpdateEmployeeReqDto): Promise<EmployeeDocument | null> {
    const updateObj = { ...updateData };

    const employee = await this.model.findByIdAndUpdate(id, updateObj, { new: true }).exec();

    return employee;
  }

  async updateByUserId(
    userId: string,
    updateData: Partial<UpdateEmployeeReqDto>,
  ): Promise<EmployeeDocument | null> {
    const updateObj = { ...updateData };

    const employee = await this.model
      .findOneAndUpdate({ userId: new Types.ObjectId(userId) }, updateObj, { new: true })
      .populate("userId", "firstName lastName email avatar phoneNumber username role status")
      .exec();

    return employee;
  }

  async deleteById(id: string): Promise<EmployeeDocument | null> {
    return await this.model.findByIdAndDelete(id).exec();
  }

  async deleteByUserId(userId: string): Promise<EmployeeDocument | null> {
    return await this.model.findOneAndDelete({ userId: new Types.ObjectId(userId) }).exec();
  }

  async findPreviousOne(filter?: Record<string, any>): Promise<EmployeeDocument | null> {
    const employee = await this.model
      .findOne({ deletedAt: null, ...filter })
      .sort({ createdAt: -1 })
      .exec();

    if (!employee)
      return await this.model.findOne({ deletedAt: null }).sort({ createdAt: 1 }).exec();

    return employee;
  }

  async findNextOne(filter?: Record<string, any>): Promise<EmployeeDocument | null> {
    const employee = await this.model
      .findOne({ deletedAt: null, ...filter })
      .sort({ createdAt: -1 })
      .exec();

    if (!employee)
      return await this.model.findOne({ deletedAt: null }).sort({ createdAt: -1 }).exec();

    return employee;
  }

  async countDocuments(filter?: Record<string, any>): Promise<number> {
    return await this.model.countDocuments({ deletedAt: null, ...filter });
  }

  async getEmployeeStats(): Promise<EmployeeStatsDto> {
    const stats = await this.model.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          active: {
            $sum: { $cond: [{ $eq: ["$employmentStatus", "active"] }, 1, 0] },
          },
          onLeave: {
            $sum: { $cond: [{ $eq: ["$employmentStatus", "on_leave"] }, 1, 0] },
          },
          terminated: {
            $sum: { $cond: [{ $eq: ["$employmentStatus", "terminated"] }, 1, 0] },
          },
          probation: {
            $sum: { $cond: [{ $eq: ["$employmentStatus", "probation"] }, 1, 0] },
          },
        },
      },
    ]);

    const result = (stats[0] || {
      total: 0,
      active: 0,
      onLeave: 0,
      terminated: 0,
      probation: 0,
    }) as EmployeeStatsDto;

    return result;
  }
}
