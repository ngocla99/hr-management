import { UserRole, UserStatus } from '@/types/api'

export const USER_ROLES = Object.values(UserRole) as [string, ...string[]]
export const USER_STATUSES = Object.values(UserStatus) as [string, ...string[]]
