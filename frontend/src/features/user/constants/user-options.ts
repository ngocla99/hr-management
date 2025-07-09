import { IconUsersGroup, IconUserShield } from '@tabler/icons-react'
import { UserStatus } from '@/types/api'
import { TFunction } from 'i18next'

export const userRoleOptionsFn = (t: TFunction) => [
  {
    label: t('admin', { ns: 'glossary' }),
    value: 'admin',
    icon: IconUserShield,
  },
  {
    label: t('employee', { ns: 'glossary' }),
    value: 'employee',
    icon: IconUsersGroup,
  },
]

export const userStatusOptionsFn = (t: TFunction) => [
  {
    label: t('status.active', { ns: 'glossary' }),
    value: UserStatus.ACTIVE,
  },
  {
    label: t('status.inactive', { ns: 'glossary' }),
    value: UserStatus.INACTIVE,
  },
  {
    label: t('status.suspended', { ns: 'glossary' }),
    value: UserStatus.SUSPENDED,
  },
]
