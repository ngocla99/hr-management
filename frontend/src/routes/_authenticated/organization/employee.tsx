import { createFileRoute } from '@tanstack/react-router'
import Employee from '@/features/employee'

export const Route = createFileRoute('/_authenticated/organization/employee')({
  component: Employee,
})
