import { UserRole } from "@/constants/roles.constant";
import {
  DateFieldOptional,
  EnumFieldOptional,
  StringFieldOptional,
} from "@/decorators/field.decorators";
import { UserStatus } from "../entities/user.entity";

export class ListUserStatsReqDto {
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
