import { UserRole } from "@/constants/roles.constant";
import {
  EmailField,
  PasswordField,
  StringField,
  StringFieldOptional,
} from "@/decorators/field.decorators";

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

  @StringFieldOptional({
    example: "employee",
    enum: UserRole,
    default: UserRole.EMPLOYEE,
  })
  role?: UserRole;
}
