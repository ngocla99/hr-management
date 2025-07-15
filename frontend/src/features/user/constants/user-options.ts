import {
  IconUserPlus,
  IconUsersGroup,
  IconUserShield,
} from '@tabler/icons-react'
import { UserStatus } from '@/types/api'

export const userRoleOptions = [
  {
    labelKey: 'admin',
    value: 'admin',
    icon: IconUserShield,
  },
  {
    labelKey: 'employee',
    value: 'employee',
    icon: IconUsersGroup,
  },
  {
    labelKey: 'recruiter',
    value: 'recruiter',
    icon: IconUserPlus,
  },
  {
    labelKey: 'hiringManager',
    value: 'hiring_manager',
    icon: IconUserPlus,
  },
  {
    labelKey: 'hrManager',
    value: 'hr_manager',
    icon: IconUserPlus,
  },
  {
    labelKey: 'superAdmin',
    value: 'super_admin',
    icon: IconUserPlus,
  },
]

export const userStatusOptions = [
  {
    labelKey: 'status.active',
    value: UserStatus.ACTIVE,
  },
  {
    labelKey: 'status.inactive',
    value: UserStatus.INACTIVE,
  },
  {
    labelKey: 'status.suspended',
    value: UserStatus.SUSPENDED,
  },
]
