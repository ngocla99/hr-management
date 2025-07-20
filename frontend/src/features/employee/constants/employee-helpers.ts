import { UserStatus } from '@/types/api'

// Status styling similar to user feature
export const employeeStatusStyles = new Map([
  [UserStatus.NOT_VERIFIED, ''],
  [UserStatus.ACTIVE, 'success'],
  [UserStatus.INACTIVE, 'dark'],
  [UserStatus.SUSPENDED, 'destructive'],
])
