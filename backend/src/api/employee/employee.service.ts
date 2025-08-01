import { CreateUserReqDto } from "@/api/user/dto/create-user.req.dto";
import { UserService } from "@/api/user/user.service";
import { OffsetPaginatedDto } from "@/common/dto/offset-pagination/paginated.dto";
import { ErrorCode } from "@/constants/error-code.constant";
import { UserRole } from "@/constants/roles.constant";
import { ValidationException } from "@/exceptions/validation.exception";
import { paginate } from "@/utils/offset-pagination";
import { forwardRef, Inject, Injectable, Logger } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { UpdateUserReqDto } from "../user/dto/update-user.req.dto";
import { CreateEmployeeReqDto } from "./dto/create-employee.req.dto";
import { EmployeeAdjacentResDto } from "./dto/employee-adjacent.res.dto";
import { EmployeeStatsDto } from "./dto/employee-stats.res.dto";
import { EmployeeResDto } from "./dto/employee.res.dto";
import { ListEmployeeReqDto } from "./dto/list-employee.req.dto";
import { UpdateEmployeeReqDto } from "./dto/update-employee.req.dto";
import { EmployeeRepository } from "./employee.repository";
import { EmployeeDocument, EmploymentStatus } from "./entities/employee.entity";
import { EmployeeNumberUtil } from "./utils/employee-number.util";
import { getEmployeeFilter } from "./utils/employee.util";

@Injectable()
export class EmployeeService {
  private readonly logger = new Logger(EmployeeService.name);

  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly employeeNumberUtil: EmployeeNumberUtil,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async create(createEmployeeDto: CreateEmployeeReqDto): Promise<EmployeeResDto> {
    let userId = createEmployeeDto.userId;

    // If no userId provided, create a user first
    if (!userId) {
      if (!createEmployeeDto.email || !createEmployeeDto.firstName || !createEmployeeDto.lastName) {
        throw new ValidationException(ErrorCode.E003);
      }

      const createUserDto: CreateUserReqDto = {
        email: createEmployeeDto.email,
        firstName: createEmployeeDto.firstName,
        lastName: createEmployeeDto.lastName,
        phoneNumber: createEmployeeDto.phoneNumber,
        avatar: createEmployeeDto.avatar,
        password: createEmployeeDto.password,
        role: UserRole.EMPLOYEE,
        gender: createEmployeeDto.gender,
        dateOfBirth: createEmployeeDto.dateOfBirth,
      };

      const newUser = await this.userService.create(createUserDto);
      userId = newUser.id;
    } else {
      // Check if user already has an employee record
      const existingUserEmployee = await this.employeeRepository.findByUserId(userId);
      if (existingUserEmployee) {
        throw new ValidationException(ErrorCode.E002);
      }
    }

    let firstName = createEmployeeDto.firstName;
    let lastName = createEmployeeDto.lastName;
    if (!firstName || !lastName) {
      const user = await this.userService.findOne(userId);
      firstName = user.firstName;
      lastName = user.lastName;
    }

    const employeeNumber = await this.employeeNumberUtil.generateEmployeeNumber(
      firstName,
      lastName,
    );

    if (createEmployeeDto.hireDate > new Date()) {
      throw new ValidationException(ErrorCode.E005);
    }

    const employeeData = {
      ...createEmployeeDto,
      userId,
      employeeNumber,
    };

    const employee = await this.employeeRepository.create(employeeData);

    return plainToInstance(EmployeeResDto, employee);
  }

  async createMany(createEmployeeDto: CreateEmployeeReqDto[]): Promise<EmployeeResDto[]> {
    const employees = await Promise.all(createEmployeeDto.map((dto) => this.create(dto)));
    return employees;
  }

  async findAll(reqDto: ListEmployeeReqDto): Promise<OffsetPaginatedDto<EmployeeResDto>> {
    const filter = getEmployeeFilter(reqDto);
    const [employees, metaDto] = await paginate<EmployeeDocument>(
      this.employeeRepository.model,
      reqDto,
      {
        skipCount: false,
        takeAll: false,
        filter,
        populate: {
          userId:
            "id firstName lastName email avatar phoneNumber username role status gender age dateOfBirth",
        },
      },
    );

    return new OffsetPaginatedDto(plainToInstance(EmployeeResDto, employees), metaDto);
  }

  async findById(id: string): Promise<EmployeeResDto> {
    const employee = await this.employeeRepository.findById(id);
    if (!employee) {
      throw new ValidationException(ErrorCode.E002);
    }

    return plainToInstance(EmployeeResDto, employee);
  }

  async findByUserId(userId: string): Promise<EmployeeResDto> {
    const employee = await this.employeeRepository.findByUserId(userId);
    if (!employee) {
      throw new ValidationException(ErrorCode.E002);
    }

    return plainToInstance(EmployeeResDto, employee);
  }

  async findByEmployeeNumber(employeeNumber: string): Promise<EmployeeResDto> {
    const employee = await this.employeeRepository.findByEmployeeNumber(employeeNumber);
    if (!employee) {
      throw new ValidationException(ErrorCode.E002);
    }

    return plainToInstance(EmployeeResDto, employee);
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeReqDto): Promise<EmployeeResDto> {
    const existingEmployee = await this.employeeRepository.findById(id);
    if (!existingEmployee) {
      throw new ValidationException(ErrorCode.E002);
    }

    // If updating user information, also update the user
    if (
      updateEmployeeDto.firstName ||
      updateEmployeeDto.lastName ||
      updateEmployeeDto.phoneNumber ||
      updateEmployeeDto.gender ||
      updateEmployeeDto.dateOfBirth
    ) {
      const userUpdateData: Partial<UpdateUserReqDto> = {};
      if (updateEmployeeDto.firstName) userUpdateData.firstName = updateEmployeeDto.firstName;
      if (updateEmployeeDto.lastName) userUpdateData.lastName = updateEmployeeDto.lastName;
      if (updateEmployeeDto.phoneNumber) userUpdateData.phoneNumber = updateEmployeeDto.phoneNumber;
      if (updateEmployeeDto.gender) userUpdateData.gender = updateEmployeeDto.gender;
      if (updateEmployeeDto.dateOfBirth) userUpdateData.dateOfBirth = updateEmployeeDto.dateOfBirth;

      await this.userService.update(existingEmployee.userId.id.toString(), userUpdateData);
    }

    // If updating hire date, validate it's not in the future
    if (updateEmployeeDto.hireDate && updateEmployeeDto.hireDate > new Date()) {
      throw new ValidationException(ErrorCode.E005);
    }

    const employee = await this.employeeRepository.updateById(id, updateEmployeeDto);

    return plainToInstance(EmployeeResDto, employee);
  }

  async updateByUserId(
    userId: string,
    updateData: Partial<UpdateEmployeeReqDto>,
  ): Promise<EmployeeResDto> {
    const existingEmployee = await this.employeeRepository.findByUserId(userId);
    if (!existingEmployee) {
      throw new ValidationException(ErrorCode.E002);
    }

    const employee = await this.employeeRepository.updateByUserId(userId, updateData);

    return plainToInstance(EmployeeResDto, employee);
  }

  async remove(id: string): Promise<void> {
    // Check if employee exists
    const existingEmployee = await this.employeeRepository.findById(id);
    if (!existingEmployee) {
      throw new ValidationException(ErrorCode.E002);
    }

    const deleted = await this.employeeRepository.deleteById(id);
    if (!deleted) {
      throw new ValidationException(ErrorCode.E002);
    }
  }

  async getAdjacentUsers(id: string): Promise<EmployeeAdjacentResDto> {
    const current = await this.employeeRepository.findById(id);
    if (!current) throw new ValidationException(ErrorCode.U002);

    const [total, position, previous, next] = await Promise.all([
      this.employeeRepository.countDocuments(),
      this.employeeRepository.countDocuments({
        createdAt: { $gte: current.createdAt },
      }),
      this.employeeRepository.findPreviousOne({
        createdAt: { $gt: current.createdAt },
      }),
      this.employeeRepository.findNextOne({
        createdAt: { $lt: current.createdAt },
      }),
    ]);

    return {
      current: {
        employee: plainToInstance(EmployeeResDto, current),
        position,
      },
      total,
      previous: plainToInstance(EmployeeResDto, previous),
      next: plainToInstance(EmployeeResDto, next),
    };
  }

  async getEmployeeStats(): Promise<EmployeeStatsDto> {
    return await this.employeeRepository.getEmployeeStats();
  }

  async terminateEmployee(id: string, terminationDate: Date): Promise<EmployeeResDto> {
    // Check if employee exists
    const existingEmployee = await this.employeeRepository.findById(id);
    if (!existingEmployee) {
      throw new ValidationException(ErrorCode.E002);
    }

    // Check if employee is already terminated
    if (existingEmployee.employmentStatus === EmploymentStatus.TERMINATED) {
      throw new ValidationException(ErrorCode.E002);
    }

    // Validate termination date
    if (terminationDate <= existingEmployee.hireDate) {
      throw new ValidationException(ErrorCode.E006);
    }

    const updatedEmployee = await this.employeeRepository.updateById(id, {
      employmentStatus: EmploymentStatus.TERMINATED,
      terminationDate,
    });

    if (!updatedEmployee) {
      throw new ValidationException(ErrorCode.E002);
    }

    return plainToInstance(EmployeeResDto, updatedEmployee);
  }

  async reactivateEmployee(id: string): Promise<EmployeeResDto> {
    // Check if employee exists
    const existingEmployee = await this.employeeRepository.findById(id);
    if (!existingEmployee) {
      throw new ValidationException(ErrorCode.E002);
    }

    // Check if employee is terminated
    if (existingEmployee.employmentStatus !== EmploymentStatus.TERMINATED) {
      throw new ValidationException(ErrorCode.E002);
    }

    const updatedEmployee = await this.employeeRepository.updateById(id, {
      employmentStatus: EmploymentStatus.ACTIVE,
      terminationDate: undefined,
    });

    if (!updatedEmployee) {
      throw new ValidationException(ErrorCode.E002);
    }

    return plainToInstance(EmployeeResDto, updatedEmployee);
  }
}
