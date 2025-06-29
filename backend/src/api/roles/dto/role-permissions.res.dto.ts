import { UserRole } from "@/constants/roles.constant";
import { EnumField, StringField } from "@/decorators/field.decorators";
import { Expose } from "class-transformer";

export class RolePermissionsResDto {
  @EnumField(() => UserRole, {
    description: "Role name",
    example: UserRole.HR_MANAGER,
  })
  @Expose()
  role: UserRole;

  @StringField({
    description: "List of permissions for this role",
    example: ["create_job", "read_job", "update_job"],
    each: true,
  })
  @Expose()
  permissions: string[];
}
