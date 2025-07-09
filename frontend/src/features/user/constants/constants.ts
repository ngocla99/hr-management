export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  HR_MANAGER = 'hr_manager',
  RECRUITER = 'recruiter',
  HIRING_MANAGER = 'hiring_manager',
  EMPLOYEE = 'employee',
}

export const USER_ROLES = [
  'super_admin',
  'admin',
  'hr_manager',
  'recruiter',
  'hiring_manager',
  'employee',
] as const
