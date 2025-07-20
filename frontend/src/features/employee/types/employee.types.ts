import { BaseEntity } from '@/types/api'

export enum EmployeeStatus {
  ACTIVE = 'active',
  NOT_ACTIVE = 'not_active',
  UNVERIFIED = 'unverified',
}

export enum MaritalStatus {
  SINGLE = 'single',
  MARRIED = 'married',
  DIVORCED = 'divorced',
  WIDOWED = 'widowed',
}

export enum EmploymentType {
  FULLTIME = 'fulltime',
  PARTTIME = 'parttime',
  CONTRACT = 'contract',
  INTERN = 'intern',
  FREELANCE = 'freelance',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export type Employee = BaseEntity & {
  // Basic Information
  employeeId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  avatar: string

  role: string

  // Professional Information
  jobTitle: string
  department: string
  team: string
  employmentType: EmploymentType
  dateJoined: string
  status: EmployeeStatus

  // Personal Information
  fullName: string
  gender: Gender
  education: string
  maritalStatus: MaritalStatus
  address: string
  emergencyContact: string

  // Additional Details
  skills: string[]
  languages: string[]
}

export type CreateEmployeeInput = Omit<
  Employee,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'fullName'
>

export type UpdateEmployeeInput = Partial<CreateEmployeeInput> & { id: string }
