import { PageOptionsDto } from "@/common/dto/offset-pagination/page-options.dto";
import { UserRole } from "@/constants/roles.constant";
import {
  DateFieldOptional,
  EnumFieldOptional,
  StringFieldOptional,
} from "@/decorators/field.decorators";
import { Department, EmploymentType, JobRole, UserStatus } from "../entities/user.entity";

export class ListUserReqDto extends PageOptionsDto {
  @StringFieldOptional({
    description: "Filter users by username",
    example: "john_doe",
  })
  readonly username?: string;

  @StringFieldOptional({
    description: "Filter users by full name",
    example: "John Doe",
  })
  readonly fullName?: string;

  @EnumFieldOptional(() => JobRole, {
    description: "Filter users by job role",
    example: [JobRole.FE_DEVELOPER],
  })
  readonly jobRole?: JobRole[];

  @EnumFieldOptional(() => Department, {
    description: "Filter users by department",
    example: [Department.IT],
  })
  readonly department?: Department[];

  @EnumFieldOptional(() => EmploymentType, {
    each: true,
    description: "Filter users by employment type",
    example: [EmploymentType.FULLTIME],
  })
  readonly employmentType?: EmploymentType[];

  @EnumFieldOptional(() => UserRole, {
    each: true,
    description: "Filter users by role",
    example: [UserRole.ADMIN, UserRole.EMPLOYEE],
  })
  readonly role?: UserRole[];

  @EnumFieldOptional(() => UserStatus, {
    description: "Filter users by status",
    example: UserStatus.ACTIVE,
  })
  readonly status?: UserStatus;

  @DateFieldOptional({
    description: "Filter users created after this date (inclusive)",
    example: "2024-01-01T00:00:00.000Z",
  })
  readonly createdAtFrom?: Date;

  @DateFieldOptional({
    description: "Filter users created before this date (inclusive)",
    example: "2024-01-31T23:59:59.999Z",
  })
  readonly createdAtTo?: Date;
}
