import { UserRole } from "@/constants/roles.constant";
import {
  EmailField,
  PasswordField,
  StringField,
  StringFieldOptional,
} from "@/decorators/field.decorators";
import { lowerCaseTransformer } from "@/utils/transformers/lower-case.transformer";
import { Transform } from "class-transformer";

export class CreateUserReqDto {
  @StringField({
    example: "emp-nemo",
  })
  @Transform(lowerCaseTransformer)
  username: string;

  @EmailField({
    example: "emp-nemo@gmail.com",
  })
  email: string;

  @PasswordField({
    example: "Qwer1234!@#$",
  })
  password: string;

  @StringFieldOptional({
    example: "EMPLOYEE",
    enum: UserRole,
    default: UserRole.EMPLOYEE,
  })
  role?: UserRole;
}
