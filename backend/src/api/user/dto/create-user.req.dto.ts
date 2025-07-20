import { UserRole } from "@/constants/roles.constant";
import {
  EmailField,
  EnumFieldOptional,
  PasswordField,
  StringField,
  StringFieldOptional,
} from "@/decorators/field.decorators";
import { UserStatus } from "../entities/user.entity";

export class CreateUserReqDto {
  @StringField({
    example: "John",
  })
  firstName: string;

  @StringField({
    example: "Doe",
  })
  lastName: string;

  @EmailField({
    example: "emp-nemo@gmail.com",
  })
  email: string;

  @PasswordField({
    example: "Qwe123!@#",
  })
  password: string;

  @StringFieldOptional({
    example: "john.doe",
    description: "Username will be auto-generated if not provided",
  })
  username?: string;

  @EnumFieldOptional(() => UserStatus, {
    description: "User status",
    example: UserStatus.ACTIVE,
  })
  status?: string;

  @StringFieldOptional({
    example: "employee",
    enum: UserRole,
    default: UserRole.EMPLOYEE,
  })
  role?: UserRole;
}
