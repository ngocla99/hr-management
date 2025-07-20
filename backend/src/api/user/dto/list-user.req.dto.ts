import { PageOptionsDto } from "@/common/dto/offset-pagination/page-options.dto";
import { UserRole } from "@/constants/roles.constant";
import {
  DateFieldOptional,
  EnumFieldOptional,
  StringFieldOptional,
} from "@/decorators/field.decorators";
import { UserStatus } from "../entities/user.entity";

export class ListUserReqDto extends PageOptionsDto {
  @StringFieldOptional({
    description: "Filter users by username",
    example: "john_doe",
  })
  readonly username?: string;

  @StringFieldOptional({
    description: "Filter users by job role",
    example: "developer",
  })
  readonly jobRole?: string;

  @StringFieldOptional({
    description: "Filter users by employment type",
    example: "full-time",
  })
  readonly employmentType?: string;

  @EnumFieldOptional(() => UserRole, { each: true })
  readonly role?: UserRole[];

  @EnumFieldOptional(() => UserStatus)
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
