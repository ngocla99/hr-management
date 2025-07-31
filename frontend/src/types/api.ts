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

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  NOT_VERIFIED = 'not_verified',
}

export type UserStats = {
  active: number
  inactive: number
  suspended: number
  unverified: number
  total: number
}

export type UserApi = Entity<{
  username: string
  firstName: string
  lastName: string
  fullName: string
  email: string
  role: UserRole
  avatar: string
  dateOfBirth: Date
  age?: number
  phoneNumber: string
  gender: Gender
  status: UserStatus
  bio?: string
  lastLogin?: Date
  emailVerified: boolean
}>

export enum MaritalStatus {
  SINGLE = 'single',
  MARRIED = 'married',
}

export enum BloodType {
  A = 'a',
  B = 'b',
  AB = 'ab',
  O = 'o',
}

export enum EmploymentStatus {
  ACTIVE = 'active',
  TERMINATED = 'terminated',
  ON_LEAVE = 'on_leave',
  PROBATION = 'probation',
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
  SALES = 'sales',
}

export type EmployeeStats = {
  active: number
  inactive: number
  suspended: number
  terminated: number
  probation: number
}

export type EmployeeApi = Entity<{
  userId: UserApi | string
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
  employeeNumber: string
  hireDate: Date
  employmentStatus: EmploymentStatus
  jobRole: JobRole
  jobLevel: JobLevel
  employmentType: EmploymentType
  department: Department
  contractEndDate: Date
  lastClockedIn?: Date
  lastMessaged?: Date
  tags?: string[]
}>

// Time Management Types
export enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  LATE = 'late',
  EARLY_LEAVE = 'early_leave',
  HALF_DAY = 'half_day',
}

export enum TimeOffStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
}

export enum TimeOffType {
  ANNUAL_LEAVE = 'annual_leave',
  SICK_LEAVE = 'sick_leave',
  PERSONAL_LEAVE = 'personal_leave',
  MATERNITY_LEAVE = 'maternity_leave',
  PATERNITY_LEAVE = 'paternity_leave',
  BEREAVEMENT_LEAVE = 'bereavement_leave',
  OTHER = 'other',
}

export enum OvertimeStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
}

export enum OvertimeType {
  REGULAR = 'regular',
  HOLIDAY = 'holiday',
  WEEKEND = 'weekend',
  NIGHT = 'night',
}

export type AttendanceResDto = Entity<{
  userId: string
  date: Date
  clockInTime: Date
  clockOutTime?: Date
  breakStartTime?: Date
  breakEndTime?: Date
  overtimeStartTime?: Date
  overtimeEndTime?: Date
  status: AttendanceStatus
  totalWorkHours?: number
  netWorkHours?: number
  totalBreakHours: number
  totalOvertimeHours?: number
  notes?: string
  isLate: boolean
  isEarlyLeave: boolean
}>

export type TimeOffResDto = Entity<{
  userId: string
  startDate: Date
  endDate: Date
  type: TimeOffType
  status: TimeOffStatus
  reason: string
  totalDays: number
  totalHours: number
  approvedBy?: string
  approvedAt?: Date
  rejectionReason?: string
  attachment?: string
  notes?: string
  isHalfDay: boolean
  halfDayType?: string
}>

export type OvertimeResDto = Entity<{
  userId: string
  requestDate: Date
  overtimeDate: Date
  startTime: Date
  endTime: Date
  status: OvertimeStatus
  type: OvertimeType
  reason: string
  totalHours: number
  hourlyRate?: number
  totalAmount?: number
  approvedBy?: string
  approvedAt?: Date
  rejectionReason?: string
  notes?: string
  isPaid: boolean
  paidAt?: Date
}>

export type AttendanceStatsDto = {
  totalDays: number
  lateDays: number
  earlyLeaveDays: number
  noClockOutDays: number
  totalWorkHours: number
}
