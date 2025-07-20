import { UserRole } from "@/constants/roles.constant";
import {
  DateFieldOptional,
  EmailField,
  EnumFieldOptional,
  PasswordField,
  StringFieldOptional,
} from "@/decorators/field.decorators";
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
    example: "+1234567890",
    description: "Phone number in international format",
  })
  phoneNumber?: string;

  @StringFieldOptional({
    example: "https://example.com/avatar.jpg",
    description: "User avatar URL",
  })
  avatar?: string;

  // Personal Information
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

  @EnumFieldOptional(() => MaritalStatus, {
    description: "Marital status",
    example: MaritalStatus.SINGLE,
  })
  maritalStatus?: MaritalStatus;

  @StringFieldOptional({
    example: "Christianity",
    description: "User religion",
  })
  religion?: string;

  @StringFieldOptional({
    example: "New York, USA",
    description: "Place of birth",
  })
  placeOfBirth?: string;

  @EnumFieldOptional(() => BloodType, {
    description: "Blood type",
    example: BloodType.A,
  })
  bloodType?: BloodType;

  // Address Information
  @StringFieldOptional({
    example: "123 Main St, City, State 12345",
    description: "Residential address",
  })
  residentialAddress?: string;

  @StringFieldOptional({
    example: "Apartment 4B",
    description: "Additional notes for residential address",
  })
  residentialAddressNotes?: string;

  @StringFieldOptional({
    example: "123 Main St, City, State 12345",
    description: "Address on citizen ID",
  })
  citizenIdAddress?: string;

  @StringFieldOptional({
    example: "Same as residential",
    description: "Additional notes for citizen ID address",
  })
  citizenIdAddressNotes?: string;

  // Contact Information
  @StringFieldOptional({
    example: "+1234567890",
    description: "Emergency contact phone number",
  })
  emergencyContactPhone?: string;

  @StringFieldOptional({
    example: "Jane Doe",
    description: "Emergency contact name",
  })
  emergencyContactName?: string;

  @StringFieldOptional({
    example: "Spouse",
    description: "Relationship to emergency contact",
  })
  emergencyContactRelationship?: string;

  // Employment Information
  @StringFieldOptional({
    example: "EMP001",
    description: "Employee ID",
  })
  employeeId?: string;

  @DateFieldOptional({
    example: "2023-01-15",
    description: "Date when employment started",
  })
  dateStarted?: Date;

  @EnumFieldOptional(() => JobRole, {
    description: "Job role/position",
    example: JobRole.FE_DEVELOPER,
  })
  jobRole?: JobRole;

  @EnumFieldOptional(() => JobLevel, {
    description: "Job level/seniority",
    example: JobLevel.JUNIOR,
  })
  jobLevel?: JobLevel;

  @EnumFieldOptional(() => EmploymentType, {
    description: "Type of employment",
    example: EmploymentType.FULLTIME,
  })
  employmentType?: EmploymentType;

  @EnumFieldOptional(() => Department, {
    description: "Department assignment",
    example: Department.IT,
  })
  department?: Department;

  @DateFieldOptional({
    example: "2024-12-31",
    description: "Contract end date",
  })
  contractEndDate?: Date;

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
