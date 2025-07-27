import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { plainToInstance } from "class-transformer";
import { Model, Types } from "mongoose";
import { CreateEmployeeReqDto } from "./dto/create-employee.req.dto";
import { EmployeeResDto } from "./dto/employee.res.dto";
import { UpdateEmployeeReqDto } from "./dto/update-employee.req.dto";
import { Employee, EmployeeDocument } from "./entities/employee.entity";

@Injectable()
export class EmployeeRepository {
  constructor(@InjectModel(Employee.name) public readonly model: Model<EmployeeDocument>) {}

  async create(employeeData: CreateEmployeeReqDto): Promise<EmployeeResDto> {
    console.log("🚀 ~ EmployeeRepository ~ create ~ employeeData:", employeeData);
    const employee = new this.model({
      ...employeeData,
      userId: new Types.ObjectId(employeeData.userId),
    });

    const savedEmployee = await employee.save();
    return plainToInstance(EmployeeResDto, savedEmployee);
  }

  async findById(id: string): Promise<EmployeeResDto | null> {
    const employee = await this.model
      .findById(id)
      .populate("userId", "firstName lastName email avatar phoneNumber username role status")
      .populate("department", "name description")
      .populate("manager", "employeeNumber position jobTitle")
      .exec();

    if (!employee) return null;
    return plainToInstance(EmployeeResDto, employee);
  }

  async findByUserId(userId: string): Promise<EmployeeResDto | null> {
    const employee = await this.model
      .findOne({ userId: new Types.ObjectId(userId) })
      .populate("userId", "firstName lastName email avatar phoneNumber username role status")
      .populate("department", "name description")
      .populate("manager", "employeeNumber position jobTitle")
      .exec();

    if (!employee) return null;
    return plainToInstance(EmployeeResDto, employee);
  }

  async findByEmployeeNumber(employeeNumber: string): Promise<EmployeeResDto | null> {
    const employee = await this.model
      .findOne({ employeeNumber: employeeNumber.toUpperCase() })
      .populate("userId", "firstName lastName email avatar phoneNumber username role status")
      .populate("department", "name description")
      .populate("manager", "employeeNumber position jobTitle")
      .exec();

    if (!employee) return null;
    return plainToInstance(EmployeeResDto, employee);
  }

  async updateById(id: string, updateData: UpdateEmployeeReqDto): Promise<EmployeeResDto | null> {
    const updateObj: any = { ...updateData };

    const employee = await this.model
      .findByIdAndUpdate(id, updateObj, { new: true })
      .populate("userId", "firstName lastName email avatar phoneNumber username role status")
      .populate("department", "name description")
      .populate("manager", "employeeNumber position jobTitle")
      .exec();

    if (!employee) return null;
    return plainToInstance(EmployeeResDto, employee);
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return !!result;
  }

  async findByDepartment(departmentId: string): Promise<EmployeeResDto[]> {
    const employees = await this.model
      .find({ department: new Types.ObjectId(departmentId) })
      .populate("userId", "firstName lastName email avatar phoneNumber username role status")
      .populate("department", "name description")
      .populate("manager", "employeeNumber position jobTitle")
      .sort({ "userId.firstName": 1, "userId.lastName": 1 })
      .exec();

    return plainToInstance(EmployeeResDto, employees);
  }

  async getEmployeeStats(): Promise<{
    total: number;
    active: number;
    onLeave: number;
    terminated: number;
    probation: number;
    onboarding: number;
  }> {
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
          onboarding: {
            $sum: {
              $cond: [
                {
                  $in: ["$onboardingStatus", ["pending", "in_progress"]],
                },
                1,
                0,
              ],
            },
          },
        },
      },
    ]);

    return (
      stats[0] || {
        total: 0,
        active: 0,
        onLeave: 0,
        terminated: 0,
        probation: 0,
        onboarding: 0,
      }
    );
  }
}
