import { UserRole } from "@/constants/roles.constant";
import {
  DateFieldOptional,
  EmailField,
  EnumFieldOptional,
  PasswordFieldOptional,
  StringFieldOptional,
} from "@/decorators/field.decorators";
import { Gender, UserStatus } from "../entities/user.entity";

export class CreateUserReqDto {
  // Basic Information
  @StringFieldOptional({
    example: "John",
  })
  firstName?: string;

  @StringFieldOptional({
    example: "Doe",
  })
  lastName?: string;

  @EmailField({
    example: "emp-nemo@gmail.com",
  })
  email: string;

  @PasswordFieldOptional({
    example: "Qwe123!@#",
  })
  password?: string;

  @StringFieldOptional({
    example: "john.doe",
    description: "Username will be auto-generated if not provided",
  })
  username?: string;

  @StringFieldOptional({
    example: "+1234567890",
    description: "Phone number in international format",
  })
  phoneNumber?: string;

  @StringFieldOptional({
    example: "https://example.com/avatar.jpg",
    description: "User avatar URL",
  })
  avatar?: string;

  // Personal Information (Basic)
  @DateFieldOptional({
    example: "1990-01-01",
    description: "Date of birth",
  })
  dateOfBirth?: Date;

  @EnumFieldOptional(() => Gender, {
    description: "User gender",
    example: Gender.MALE,
  })
  gender?: Gender;

  @StringFieldOptional({
    example: "Short bio about the user",
    description: "User bio",
  })
  bio?: string;

  // System Information
  @EnumFieldOptional(() => UserRole, {
    description: "User role in the system",
    example: UserRole.EMPLOYEE,
  })
  role?: UserRole;

  @EnumFieldOptional(() => UserStatus, {
    description: "User status",
    example: UserStatus.ACTIVE,
  })
  status?: UserStatus;

  @StringFieldOptional({
    each: true,
    example: ["developer", "senior"],
    description: "Tags for categorizing users",
  })
  tags?: string[];
}
