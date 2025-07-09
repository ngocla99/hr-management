export type BaseEntity = {
  id: string
  deletedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export type Entity<T> = {
  [K in keyof T]: T[K]
} & BaseEntity

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  HR_MANAGER = 'hr_manager',
  RECRUITER = 'recruiter',
  HIRING_MANAGER = 'hiring_manager',
  EMPLOYEE = 'employee',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

export type User = Entity<{
  username: string
  email: string
  password: string
  role: UserRole
  avatar: string
  dateOfBirth: Date
  gender: string
  status: UserStatus
}>
