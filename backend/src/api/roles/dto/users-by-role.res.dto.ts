import { UserRole } from "@/constants/roles.constant";
import { EmailField, EnumField, StringField, UUIDField } from "@/decorators/field.decorators";
import { Expose } from "class-transformer";

export class UsersByRoleResDto {
  @UUIDField({
    description: "User ID",
  })
  @Expose()
  id: string;

  @EmailField({
    description: "User email",
  })
  @Expose()
  email: string;

  @StringField({
    description: "User first name",
  })
  @Expose()
  firstName: string;

  @StringField({
    description: "User last name",
  })
  @Expose()
  lastName: string;

  @EnumField(() => UserRole, {
    description: "User role",
    example: UserRole.EMPLOYEE,
  })
  @Expose()
  role: string;
}
