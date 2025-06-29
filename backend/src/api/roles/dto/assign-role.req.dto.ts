import { UserRole } from "@/constants/roles.constant";
import { EnumField, UUIDField } from "@/decorators/field.decorators";
import { Expose } from "class-transformer";

export class AssignRoleReqDto {
  @UUIDField({
    description: "User ID to assign role to",
    example: "60b5f8c2e4b0a12b8c2e4b0a",
  })
  @Expose()
  userId: string;

  @EnumField(() => UserRole, {
    description: "Role to assign",
    example: UserRole.HR_MANAGER,
  })
  @Expose()
  role: UserRole;
}
