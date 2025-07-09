export type BaseEntity = {
  id: string
  deletedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export type Entity<T> = {
  [K in keyof T]: T[K]
} & BaseEntity

export type UserRole =
  | 'super_admin'
  | 'admin'
  | 'hr_manager'
  | 'recruiter'
  | 'hiring_manager'
  | 'employee'

export type User = Entity<{
  username: string
  email: string
  password: string
  role: UserRole
  avatar: string
  dateOfBirth: Date
  gender: string
}>
