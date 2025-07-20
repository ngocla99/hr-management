import { BloodType, Department, EmploymentType, Gender, JobLevel, JobRole, MaritalStatus } from '@/types/api'

export const GENDERS = Object.values(Gender) as [string, ...string[]]
export const MARITAL_STATUSES = Object.values(MaritalStatus) as [
  string,
  ...string[],
]
export const BLOOD_TYPES = Object.values(BloodType) as [string, ...string[]]
export const JOB_ROLES = Object.values(JobRole) as [string, ...string[]]
export const DEPARTMENTS = Object.values(Department) as [string, ...string[]]
export const EMPLOYMENT_TYPES = Object.values(EmploymentType) as [
  string,
  ...string[],
]
export const JOB_LEVELS = Object.values(JobLevel) as [string, ...string[]]
