import { Gender } from "@/api/user/entities/user.entity";
import {
  DateFieldOptional,
  EmailFieldOptional,
  EnumFieldOptional,
  StringFieldOptional,
} from "@/decorators/field.decorators";
import { Transform } from "class-transformer";
import {
  BloodType,
  Department,
  EmploymentStatus,
  EmploymentType,
  JobLevel,
  JobRole,
  MaritalStatus,
} from "../entities/employee.entity";

export class CreateEmployeeReqDto {
  @StringFieldOptional({
    description: "User ID to associate with employee",
    example: "60b5f8c2e4b0a12b8c2e4b0a",
  })
  @Transform(({ value }) => (value as string)?.trim())
  userId?: string;

  @EmailFieldOptional({
    description: "Email",
    example: "john.doe@example.com",
  })
  email?: string;

  @StringFieldOptional({
    description: "First name",
    example: "John",
  })
  firstName?: string;

  @StringFieldOptional({
    description: "Last name",
    example: "Doe",
  })
  lastName?: string;

  @StringFieldOptional({
    description: "Phone number",
    example: "+1234567890",
  })
  phoneNumber?: string;

  @StringFieldOptional({
    description: "Avatar",
    example: "https://example.com/avatar.jpg",
  })
  avatar?: string;

  @StringFieldOptional({
    description: "Password",
    example: "password",
  })
  password?: string;

  @EnumFieldOptional(() => Gender, {
    description: "Gender",
    example: Gender.MALE,
  })
  gender?: Gender;

  @DateFieldOptional({
    description: "Date of birth",
    example: "2024-01-15T00:00:00.000Z",
  })
  dateOfBirth?: Date;

  @DateFieldOptional({
    description: "Hire date",
    example: "2024-01-15T00:00:00.000Z",
  })
  hireDate: Date;

  @EnumFieldOptional(() => EmploymentStatus, {
    description: "Employment status",
    example: EmploymentStatus.ACTIVE,
  })
  employmentStatus?: EmploymentStatus;

  @EnumFieldOptional(() => MaritalStatus, {
    description: "Marital status",
    example: MaritalStatus.SINGLE,
  })
  maritalStatus?: MaritalStatus;

  @StringFieldOptional({
    description: "Religion",
    example: "Buddhism",
  })
  religion?: string;

  @StringFieldOptional({
    description: "Place of birth",
    example: "New York",
  })
  placeOfBirth?: string;

  @EnumFieldOptional(() => BloodType, {
    description: "Blood type",
    example: BloodType.A,
  })
  bloodType?: BloodType;

  @StringFieldOptional({
    description: "Residential address",
    example: "123 Main St, Anytown, USA",
  })
  residentialAddress?: string;

  @StringFieldOptional({
    description: "Residential address notes",
    example: "Apartment 123",
  })
  residentialAddressNotes?: string;

  @StringFieldOptional({
    description: "Citizen ID address",
    example: "123 Main St, Anytown, USA",
  })
  citizenIdAddress?: string;

  @StringFieldOptional({
    description: "Citizen ID address notes",
    example: "Apartment 123",
  })
  citizenIdAddressNotes?: string;

  @StringFieldOptional({
    description: "Emergency contact phone",
    example: "+1234567890",
  })
  emergencyContactPhone?: string;

  @StringFieldOptional({
    description: "Emergency contact name",
    example: "John Doe",
  })
  emergencyContactName?: string;

  @StringFieldOptional({
    description: "Emergency contact relationship",
    example: "Father",
  })
  emergencyContactRelationship?: string;

  @EnumFieldOptional(() => Department, {
    description: "Department",
    example: Department.IT,
  })
  department?: Department;

  @EnumFieldOptional(() => JobRole, {
    description: "Job role",
    example: JobRole.FE_DEVELOPER,
  })
  jobRole?: JobRole;

  @EnumFieldOptional(() => JobLevel, {
    description: "Job level",
    example: JobLevel.JUNIOR,
  })
  jobLevel?: JobLevel;

  @EnumFieldOptional(() => EmploymentType, {
    description: "Employment type",
    example: EmploymentType.FULLTIME,
  })
  employmentType?: EmploymentType;

  @DateFieldOptional({
    description: "Last clocked in",
    example: "2025-01-15T00:00:00.000Z",
  })
  lastClockedIn?: Date;

  @DateFieldOptional({
    description: "Last messaged",
    example: "2025-01-15T00:00:00.000Z",
  })
  lastMessaged?: Date;

  @StringFieldOptional({
    description: "Tags",
    example: ["tag1", "tag2"],
    each: true,
  })
  tags?: string[];

  @DateFieldOptional({
    description: "Termination date",
    example: "2025-01-15T00:00:00.000Z",
  })
  terminationDate?: Date;
}
