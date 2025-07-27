import { PageOptionsDto } from "@/common/dto/offset-pagination/page-options.dto";
import {
  DateFieldOptional,
  EnumFieldOptional,
  StringFieldOptional,
} from "@/decorators/field.decorators";
import { Department, EmploymentStatus, EmploymentType, JobRole } from "../entities/employee.entity";

export class ListEmployeeReqDto extends PageOptionsDto {
  @StringFieldOptional({
    description: "Filter employees by employee number",
    example: "EMP-0001",
  })
  readonly employeeNumber?: string;

  @StringFieldOptional({
    description: "Filter users by full name",
    example: "John Doe",
  })
  readonly fullName?: string;

  @EnumFieldOptional(() => JobRole, {
    description: "Filter employees by job role",
    example: [JobRole.FE_DEVELOPER],
  })
  readonly jobRole?: JobRole[];

  @EnumFieldOptional(() => Department, {
    description: "Filter employees by department",
    example: [Department.IT],
  })
  readonly department?: Department[];

  @EnumFieldOptional(() => EmploymentType, {
    each: true,
    description: "Filter employees by employment type",
    example: [EmploymentType.FULLTIME],
  })
  readonly employmentType?: EmploymentType[];

  @EnumFieldOptional(() => EmploymentStatus, {
    description: "Filter employees by employment status",
    example: EmploymentStatus.ACTIVE,
  })
  readonly employmentStatus?: EmploymentStatus;

  @DateFieldOptional({
    description: "Filter employees created after this date (inclusive)",
    example: "2024-01-01T00:00:00.000Z",
  })
  readonly createdAtFrom?: Date;

  @DateFieldOptional({
    description: "Filter employees created before this date (inclusive)",
    example: "2024-01-31T23:59:59.999Z",
  })
  readonly createdAtTo?: Date;
}
