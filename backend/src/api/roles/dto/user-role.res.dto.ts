import { UserRole } from "@/constants/roles.constant";
import { EnumField, StringField, UUIDField } from "@/decorators/field.decorators";
import { Expose } from "class-transformer";

export class UserRoleResDto {
  @UUIDField({
    description: "User ID",
    example: "60b5f8c2e4b0a12b8c2e4b0a",
  })
  @Expose()
  userId: string;

  @EnumField(() => UserRole, {
    description: "User's current role",
    example: UserRole.EMPLOYEE,
  })
  @Expose()
  role: UserRole;

  @StringField({
    description: "User's permissions based on role",
    example: ["upload_file", "read_file"],
    each: true,
  })
  @Expose()
  permissions: string[];
}
