import { IconUsersGroup, IconUserShield } from '@tabler/icons-react'
import { TFunction } from 'i18next'
import { UserStatus } from './schema'

export const callTypes = new Map<UserStatus, string>([
  ['active', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['inactive', 'bg-neutral-300/40 border-neutral-300'],
  [
    'suspended',
    'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
  ],
])

export const userTypesFn = (t: TFunction) => [
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
