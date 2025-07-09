import { UserRole, UserStatus } from '@/types/api'

export const USER_ROLES = Object.values(UserRole) as [string, ...string[]]
export const USER_STATUSES = Object.values(UserStatus) as [string, ...string[]]

export const userStatusStyles = new Map<UserStatus, string>([
  [
    UserStatus.ACTIVE,
    'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200',
  ],
  [UserStatus.INACTIVE, 'bg-neutral-300/40 border-neutral-300'],
  [
    UserStatus.SUSPENDED,
    'bg-destructive/10 dark:bg-destructive/50 text-destructive border-destructive/10',
  ],
])
