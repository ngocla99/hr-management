import {
  IconUserPlus,
  IconUsersGroup,
  IconUserShield,
} from '@tabler/icons-react'
import { UserStatus } from '@/types/api'
import { TFunction } from 'i18next'

export const userRoleOptionsFn = (t: TFunction) => [
  {
    value: 'admin',
    icon: IconUserShield,
    label: t('role.admin', { ns: 'users' }),
  },
  {
    value: 'employee',
    icon: IconUsersGroup,
    label: t('role.employee', { ns: 'users' }),
  },
  {
    value: 'recruiter',
    icon: IconUserPlus,
    label: t('role.recruiter', { ns: 'users' }),
  },
  {
    value: 'hiring_manager',
    icon: IconUserPlus,
    label: t('role.hiringManager', { ns: 'users' }),
  },
  {
    value: 'hr_manager',
    icon: IconUserPlus,
    label: t('role.hrManager', { ns: 'users' }),
  },
  {
    value: 'super_admin',
    icon: IconUserPlus,
    label: t('role.superAdmin', { ns: 'users' }),
  },
]

export const userStatusOptionsFn = (t: TFunction) => [
  {
    value: UserStatus.ACTIVE,
    label: t('status.active', { ns: 'users' }),
  },
  {
    value: UserStatus.INACTIVE,
    label: t('status.inactive', { ns: 'users' }),
  },
  {
    value: UserStatus.SUSPENDED,
    label: t('status.suspended', { ns: 'users' }),
  },
]
