import { createFileRoute } from '@tanstack/react-router'
import User from '@/features/user'

export const Route = createFileRoute('/_authenticated/organization/user')({
  component: User,
})
