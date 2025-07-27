/*eslint-disable */
import { UserResDto } from "@/api/user/dto/user.res.dto";
import {
  ClassField,
  DateField,
  EnumField,
  NumberField,
  StringField,
} from "@/decorators/field.decorators";
import { Exclude, Expose } from "class-transformer";
import {
  BloodType,
  Department,
  EmploymentStatus,
  EmploymentType,
  JobLevel,
  JobRole,
  MaritalStatus,
} from "../entities/employee.entity";

@Exclude()
export class EmployeeResDto {
  // Basic Information
  @StringField({
    description: "Employee ID",
    example: "60b5f8c2e4b0a12b8c2e4b0a",
  })
  @Expose()
  id: string;

  @ClassField(() => UserResDto, {
    description: "User ID associated with employee",
    example: {
      id: "60b5f8c2e4b0a12b8c2e4b0a",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phoneNumber: "+1234567890",
    },
  })
  @Expose()
  userId: UserResDto;

  @StringField({
    description: "Employee number (unique identifier)",
    example: "EMP001",
  })
  @Expose()
  employeeNumber: string;

  // Employment Details
  @DateField({
    description: "Hire date",
    example: "2024-01-15T00:00:00.000Z",
  })
  @Expose()
  hireDate: Date;

  @DateField({
    description: "Termination date",
    example: "2025-01-15T00:00:00.000Z",
    nullable: true,
  })
  @Expose()
  terminationDate?: Date;

  @EnumField(() => EmploymentStatus, {
    description: "Employment status",
    example: EmploymentStatus.ACTIVE,
  })
  @Expose()
  employmentStatus: EmploymentStatus;

  @NumberField({
    description: "Years of service (computed)",
    example: 2,
  })
  @Expose()
  yearsOfService: number;

  // Position & Reporting
  @StringField({
    description: "Employee position",
    example: "Software Engineer",
  })
  @Expose()
  position: string;

  @StringField({
    description: "Job title",
    example: "Senior Software Engineer",
  })
  @Expose()
  jobTitle: string;

  @EnumField(() => Department, {
    description: "Department ID",
    example: Department.IT,
  })
  @Expose()
  department: Department;

  @EnumField(() => JobRole, {
    description: "Job role",
    example: JobRole.FE_DEVELOPER,
  })
  @Expose()
  jobRole: JobRole;

  @EnumField(() => JobLevel, {
    description: "Job level",
    example: JobLevel.JUNIOR,
  })
  @Expose()
  jobLevel: JobLevel;

  @EnumField(() => EmploymentType, {
    description: "Employment type",
    example: EmploymentType.FULLTIME,
  })
  @Expose()
  employmentType: EmploymentType;

  @EnumField(() => MaritalStatus, {
    description: "Marital status",
    example: MaritalStatus.SINGLE,
  })
  @Expose()
  maritalStatus: MaritalStatus;

  @StringField({
    description: "Religion",
    example: "Christian",
  })
  @Expose()
  religion: string;

  @StringField({
    description: "Place of birth",
    example: "New York",
  })
  @Expose()
  placeOfBirth: string;

  @EnumField(() => BloodType, {
    description: "Blood type",
    example: BloodType.A,
  })
  @Expose()
  bloodType: BloodType;

  @StringField({
    description: "Residential address",
    example: "123 Main St, Anytown, USA",
  })
  @Expose()
  residentialAddress: string;

  @StringField({
    description: "Residential address notes",
    example: "Apartment 123",
  })
  @Expose()
  residentialAddressNotes: string;

  @StringField({
    description: "Citizen ID address",
    example: "123 Main St, Anytown, USA",
  })
  @Expose()
  citizenIdAddress: string;

  @StringField({
    description: "Citizen ID address notes",
    example: "Apartment 123",
  })
  @Expose()
  citizenIdAddressNotes: string;

  @StringField({
    description: "Emergency contact name",
    example: "John Doe",
  })
  @Expose()
  emergencyContactName: string;

  @StringField({
    description: "Emergency contact phone",
    example: "+1234567890",
  })
  @Expose()
  emergencyContactPhone: string;

  @StringField({
    description: "Emergency contact relationship",
    example: "Father",
  })
  @Expose()
  emergencyContactRelationship: string;

  // Timestamps
  @DateField({
    description: "Creation timestamp",
    example: "2024-01-01T00:00:00.000Z",
  })
  @Expose()
  createdAt: Date;

  @DateField({
    description: "Last update timestamp",
    example: "2024-01-15T10:30:00.000Z",
  })
  @Expose()
  updatedAt: Date;
}
