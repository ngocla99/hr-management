import { PageOptionsDto } from "@/common/dto/offset-pagination/page-options.dto";
import { UserRole } from "@/constants/roles.constant";
import { DateFieldOptional, EnumFieldOptional } from "@/decorators/field.decorators";
import { UserStatus } from "./user.res.dto";

export class ListUserReqDto extends PageOptionsDto {
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
