import { OffsetPaginatedDto } from "@/common/dto/offset-pagination/paginated.dto";
import { Permission } from "@/constants/roles.constant";
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
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { CreateEmployeeReqDto } from "./dto/create-employee.req.dto";
import { CreateEmployeesReqDto } from "./dto/create-employees.req.dto";
import { EmployeeResDto } from "./dto/employee.res.dto";
import { ListEmployeeReqDto } from "./dto/list-employee.req.dto";
import { UpdateEmployeeReqDto } from "./dto/update-employee.req.dto";
import { EmployeeService } from "./employee.service";

@ApiTags("employees")
@Controller({
  path: "employees",
  version: "1",
})
@UseGuards(RolesGuard)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @ApiAuth({
    type: EmployeeResDto,
    summary: "Create new employee",
    statusCode: HttpStatus.CREATED,
  })
  @RequirePermission(Permission.CREATE_EMPLOYEE)
  async create(@Body() createEmployeeDto: CreateEmployeeReqDto): Promise<EmployeeResDto> {
    return await this.employeeService.create(createEmployeeDto);
  }

  @Post("create-many")
  @ApiAuth({
    type: EmployeeResDto,
    summary: "Create multiple employees",
    statusCode: HttpStatus.CREATED,
  })
  @RequirePermission(Permission.CREATE_EMPLOYEE)
  async createMany(@Body() createEmployeesDto: CreateEmployeesReqDto): Promise<EmployeeResDto[]> {
    return await this.employeeService.createMany(createEmployeesDto.employees);
  }

  @Get()
  @ApiAuth({
    type: OffsetPaginatedDto<EmployeeResDto>,
    summary: "Get all employees with pagination and filters",
    isPaginated: true,
  })
  @RequirePermission(Permission.READ_EMPLOYEE)
  async findAll(@Query() reqDto: ListEmployeeReqDto): Promise<OffsetPaginatedDto<EmployeeResDto>> {
    return await this.employeeService.findAll(reqDto);
  }

  @Get("stats")
  @ApiAuth({
    type: Object,
    summary: "Get employee statistics",
  })
  @RequirePermission(Permission.READ_EMPLOYEE)
  async getEmployeeStats() {
    return await this.employeeService.getEmployeeStats();
  }

  @Get(":id")
  @ApiAuth({
    type: EmployeeResDto,
    summary: "Get employee by ID",
  })
  @RequirePermission(Permission.READ_EMPLOYEE)
  @ApiParam({ name: "id", type: "String" })
  async findOne(@Param("id") id: string): Promise<EmployeeResDto> {
    return await this.employeeService.findById(id);
  }

  @Get("user/:userId")
  @ApiAuth({
    type: EmployeeResDto,
    summary: "Get employee by user ID",
  })
  @RequirePermission(Permission.READ_EMPLOYEE)
  @ApiParam({ name: "userId", type: "String" })
  async findByUserId(@Param("userId") userId: string): Promise<EmployeeResDto> {
    return await this.employeeService.findByUserId(userId);
  }

  @Get("number/:employeeNumber")
  @ApiAuth({
    type: EmployeeResDto,
    summary: "Get employee by employee number",
  })
  @RequirePermission(Permission.READ_EMPLOYEE)
  @ApiParam({ name: "employeeNumber", type: "String" })
  async findByEmployeeNumber(
    @Param("employeeNumber") employeeNumber: string,
  ): Promise<EmployeeResDto> {
    return await this.employeeService.findByEmployeeNumber(employeeNumber);
  }

  @Put(":id")
  @ApiAuth({
    type: EmployeeResDto,
    summary: "Update employee",
  })
  @RequirePermission(Permission.UPDATE_EMPLOYEE)
  @ApiParam({ name: "id", type: "String" })
  async update(
    @Param("id") id: string,
    @Body() updateEmployeeDto: UpdateEmployeeReqDto,
  ): Promise<EmployeeResDto> {
    return await this.employeeService.update(id, updateEmployeeDto);
  }

  @Put(":id/terminate")
  @ApiAuth({
    type: EmployeeResDto,
    summary: "Terminate employee",
  })
  @RequirePermission(Permission.UPDATE_EMPLOYEE)
  @ApiParam({ name: "id", type: "String" })
  async terminateEmployee(
    @Param("id") id: string,
    @Body() body: { terminationDate: Date },
  ): Promise<EmployeeResDto> {
    return await this.employeeService.terminateEmployee(id, body.terminationDate);
  }

  @Put(":id/reactivate")
  @ApiAuth({
    type: EmployeeResDto,
    summary: "Reactivate terminated employee",
  })
  @RequirePermission(Permission.UPDATE_EMPLOYEE)
  @ApiParam({ name: "id", type: "String" })
  async reactivateEmployee(@Param("id") id: string): Promise<EmployeeResDto> {
    return await this.employeeService.reactivateEmployee(id);
  }

  @Delete(":id")
  @ApiAuth({
    type: EmployeeResDto,
    summary: "Delete employee",
  })
  @RequirePermission(Permission.DELETE_EMPLOYEE)
  @ApiParam({ name: "id", type: "String" })
  async remove(@Param("id") id: string): Promise<void> {
    return await this.employeeService.remove(id);
  }
}
