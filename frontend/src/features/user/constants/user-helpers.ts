import { UserStatus } from '@/types/api'

export const userStatusStyles = new Map<UserStatus, string>([
  [UserStatus.ACTIVE, 'success'],
  [UserStatus.SUSPENDED, 'warning'],
  [UserStatus.INACTIVE, 'dark'],
])
