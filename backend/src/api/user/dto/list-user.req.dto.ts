import { PageOptionsDto } from "@/common/dto/offset-pagination/page-options.dto";
import { UserRole } from "@/constants/roles.constant";
import { EnumFieldOptional } from "@/decorators/field.decorators";
import { UserStatus } from "./user.res.dto";

export class ListUserReqDto extends PageOptionsDto {
  @EnumFieldOptional(() => UserRole, { each: true })
  readonly role?: UserRole[];

  @EnumFieldOptional(() => UserStatus)
  readonly status?: UserStatus;
}
