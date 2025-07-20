export type BaseEntity = {
  id: string
  deletedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export type Entity<T> = {
  [K in keyof T]: T[K]
} & BaseEntity

export type Auth = {
  userId: string
  accessToken: string
  refreshToken: string
  tokenExpires: number
}

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  HR_MANAGER = 'hr_manager',
  RECRUITER = 'recruiter',
  HIRING_MANAGER = 'hiring_manager',
  EMPLOYEE = 'employee',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum MaritalStatus {
  SINGLE = 'single',
  MARRIED = 'married',
}

export enum BloodType {
  A = 'A',
  B = 'B',
  AB = 'AB',
  O = 'O',
}

export enum EmploymentType {
  FULLTIME = 'fulltime',
  PARTTIME = 'parttime',
  CONTRACT = 'contract',
  INTERN = 'intern',
  FREELANCE = 'freelance',
}

export enum JobLevel {
  ENTRY = 'entry',
  JUNIOR = 'junior',
  MID = 'mid',
  SENIOR = 'senior',
  LEAD = 'lead',
  MANAGER = 'manager',
  DIRECTOR = 'director',
  EXECUTIVE = 'executive',
}

export enum JobRole {
  FE_DEVELOPER = 'fe_developer',
  BE_DEVELOPER = 'be_developer',
  FULLSTACK_DEVELOPER = 'fullstack_developer',
  MOBILE_DEVELOPER = 'mobile_developer',
  DESIGNER = 'designer',
  QA = 'qa',
  HR = 'hr',
  ACCOUNTANT = 'accountant',
}

export enum Department {
  QA = 'qa',
  IT = 'it',
  HR = 'hr',
  FINANCE = 'finance',
  MARKETING = 'marketing',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  NOT_VERIFIED = 'not_verified',
}

export type UserStats = {
  totalActive: number
  totalInactive: number
  totalSuspended: number
  totalUnverified: number
}

export type User = Entity<{
  username: string
  firstName: string
  lastName: string
  fullName: string
  email: string
  password: string
  role: UserRole
  avatar: string
  dateOfBirth: Date
  phoneNumber: string
  gender: Gender
  maritalStatus: MaritalStatus
  religion: string
  placeOfBirth: string
  bloodType: BloodType
  residentialAddress: string
  residentialAddressNotes: string
  citizenIdAddress: string
  citizenIdAddressNotes: string
  emergencyContactPhone: string
  emergencyContactName: string
  emergencyContactRelationship: string
  employeeId: string
  dateStarted: Date
  jobRole: JobRole
  jobLevel: JobLevel
  employmentType: EmploymentType
  department: Department
  contractEndDate: Date
  status: UserStatus
  lastClockedIn: Date
  lastMessaged: Date
  tags: string[]
}>
