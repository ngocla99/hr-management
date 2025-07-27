import { EmploymentStatus } from '@/types/api'
import { VariantProps } from 'class-variance-authority'
import { badgeVariants } from '@/components/ui/badge'

export const employeeStatusStyles = new Map<
  EmploymentStatus,
  VariantProps<typeof badgeVariants>['variant']
>([
  [EmploymentStatus.ACTIVE, 'success'],
  [EmploymentStatus.TERMINATED, 'destructive'],
  [EmploymentStatus.ON_LEAVE, 'warning'],
  [EmploymentStatus.PROBATION, 'default'],
])
