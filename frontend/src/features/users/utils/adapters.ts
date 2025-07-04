import { formatDate } from '@/lib/date'
import { UserSchema } from '@/lib/validations/user'
import { User } from '../data/schema'

/**
 * Transforms API user data to local User format
 * @param apiUser - User data from API
 * @returns Transformed user data for local use
 */
export const adaptApiUserToLocalUser = (apiUser: UserSchema): User => {
  // Map API status to local status enum
  const statusMap: Record<string, User['status']> = {
    active: 'active',
    inactive: 'inactive',
    suspended: 'suspended',
  }

  return {
    id: apiUser.id,
    name: apiUser.name,
    email: apiUser.email,
    phoneNumber: '_', // Not available in API schema
    status: statusMap[apiUser.status.toLowerCase()] || 'active',
    role: apiUser.roles[0] as User['role'],
    createdAt: formatDate(apiUser.createdAt),
    updatedAt: formatDate(apiUser.updatedAt),
  }
}

/**
 * Transforms multiple API users to local format
 * @param apiUsers - Array of users from API
 * @returns Array of transformed users for local use
 */
export const adaptApiUsersToLocalUsers = (apiUsers: UserSchema[]): User[] => {
  return apiUsers.map(adaptApiUserToLocalUser)
}
