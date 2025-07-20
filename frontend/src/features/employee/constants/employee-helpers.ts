import { UserStatus } from '@/types/api'
import { VariantProps } from 'class-variance-authority'
import { badgeVariants } from '@/components/ui/badge'

// Status styling similar to user feature
export const employeeStatusStyles = new Map<
  UserStatus,
  VariantProps<typeof badgeVariants>['variant']
>([
  [UserStatus.NOT_VERIFIED, 'default'],
  [UserStatus.ACTIVE, 'success'],
  [UserStatus.INACTIVE, 'dark'],
  [UserStatus.SUSPENDED, 'destructive'],
])
