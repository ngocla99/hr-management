import { UserRole } from "@/constants/roles.constant";
import {
  ClassField,
  DateField,
  EnumField,
  NumberField,
  StringField,
} from "@/decorators/field.decorators";
import { Exclude, Expose } from "class-transformer";
import { Gender, UserStatus } from "../entities/user.entity";

@Exclude()
export class UserResDto {
  // Basic Information
  @StringField({
    description: "User ID",
    example: "60b5f8c2e4b0a12b8c2e4b0a",
  })
  @Expose()
  id: string;

  @StringField({
    description: "Username",
    example: "john.doe",
  })
  @Expose()
  username: string;

  @StringField({
    description: "First name",
    example: "John",
  })
  @Expose()
  firstName: string;

  @StringField({
    description: "Last name",
    example: "Doe",
  })
  @Expose()
  lastName: string;

  @StringField({
    description: "Full name (computed)",
    example: "John Doe",
  })
  @Expose()
  fullName: string;

  @StringField({
    description: "Avatar URL",
    example: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
  })
  @Expose()
  avatar: string;

  @StringField({
    description: "Email address",
    example: "john.doe@example.com",
  })
  @Expose()
  email: string;

  @StringField({
    description: "Phone number",
    example: "+62-921-019-112",
  })
  @Expose()
  phoneNumber: string;

  // Personal Information
  @DateField({
    description: "Date of birth",
    example: "1997-03-06T00:00:00.000Z",
  })
  @Expose()
  dateOfBirth: Date;

  @EnumField(() => Gender, {
    description: "Gender",
    example: Gender.MALE,
  })
  @Expose()
  gender: string;

  @NumberField({
    description: "Age (computed)",
    example: 27,
  })
  @Expose()
  age: number;

  // System Information
  @EnumField(() => UserRole, {
    description: "User role",
    example: UserRole.EMPLOYEE,
  })
  @Expose()
  role: string;

  @EnumField(() => UserStatus, {
    description: "User status",
    example: UserStatus.ACTIVE,
  })
  @Expose()
  status: string;

  // Timestamps
  @ClassField(() => Date, {
    description: "Creation timestamp",
    example: "2024-01-01T00:00:00.000Z",
  })
  @Expose()
  createdAt: Date;

  @ClassField(() => Date, {
    description: "Last update timestamp",
    example: "2024-01-15T10:30:00.000Z",
  })
  @Expose()
  updatedAt: Date;
}
