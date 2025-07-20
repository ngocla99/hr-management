import { UserRole } from "@/constants/roles.constant";
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
  EmploymentType,
  Gender,
  JobLevel,
  JobRole,
  MaritalStatus,
  UserStatus,
} from "../entities/user.entity";

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

  @EnumField(() => MaritalStatus, {
    description: "Marital status",
    example: MaritalStatus.SINGLE,
  })
  @Expose()
  maritalStatus: string;

  @StringField({
    description: "Religion",
    example: "Muslim",
  })
  @Expose()
  religion: string;

  @StringField({
    description: "Place of birth",
    example: "Bandung",
  })
  @Expose()
  placeOfBirth: string;

  @EnumField(() => BloodType, {
    description: "Blood type",
    example: BloodType.B,
  })
  @Expose()
  bloodType: string;

  @NumberField({
    description: "Age (computed)",
    example: 27,
  })
  @Expose()
  age: number;

  // Address Information
  @StringField({
    description: "Residential address",
    example: "4517 Washington Ave. Manchester, Kentucky 39495",
  })
  @Expose()
  residentialAddress: string;

  @StringField({
    description: "Residential address notes",
    example: "Additional notes about residential address",
  })
  @Expose()
  residentialAddressNotes: string;

  @StringField({
    description: "Citizen ID address",
    example: "2715 Ash Dr. San Jose, South Dakota 83475",
  })
  @Expose()
  citizenIdAddress: string;

  @StringField({
    description: "Citizen ID address notes",
    example: "Egestas scelerisque sit curabitur massa eu sit.",
  })
  @Expose()
  citizenIdAddressNotes: string;

  // Contact Information
  @StringField({
    description: "Emergency contact phone",
    example: "+62-921-019-113",
  })
  @Expose()
  emergencyContactPhone: string;

  @StringField({
    description: "Emergency contact name",
    example: "Jane Doe",
  })
  @Expose()
  emergencyContactName: string;

  @StringField({
    description: "Emergency contact relationship",
    example: "Spouse",
  })
  @Expose()
  emergencyContactRelationship: string;

  // Employment Information
  @StringField({
    description: "Employee ID",
    example: "EMP07",
  })
  @Expose()
  employeeId: string;

  @DateField({
    description: "Employment start date",
    example: "2020-01-15T00:00:00.000Z",
  })
  @Expose()
  dateStarted: Date;

  @NumberField({
    description: "Years of service (computed)",
    example: 4,
  })
  @Expose()
  yearsOfService: number;

  @EnumField(() => JobRole, {
    description: "Job role",
    example: JobRole.PROJECT_MANAGER,
  })
  @Expose()
  jobRole: string;

  @EnumField(() => JobLevel, {
    description: "Job level",
    example: JobLevel.MANAGER,
  })
  @Expose()
  jobLevel: string;

  @EnumField(() => EmploymentType, {
    description: "Employment type",
    example: EmploymentType.FULLTIME,
  })
  @Expose()
  employmentType: string;

  @EnumField(() => Department, {
    description: "Department",
    example: Department.IT,
  })
  @Expose()
  department: string;

  @DateField({
    description: "Contract end date",
    example: "2025-01-15T00:00:00.000Z",
  })
  @Expose()
  contractEndDate: Date;

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

  @DateField({
    description: "Last clock-in timestamp",
    example: "2024-01-15T08:30:00.000Z",
  })
  @Expose()
  lastClockedIn: Date;

  @DateField({
    description: "Last message timestamp",
    example: "2024-01-13T14:20:00.000Z",
  })
  @Expose()
  lastMessaged: Date;

  @StringField({
    description: "User tags",
    example: ["developer", "senior", "team-lead"],
    each: true,
  })
  @Expose()
  tags: string[];

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
