import { createFileRoute } from '@tanstack/react-router'
import Structure from '@/features/structure'

export const Route = createFileRoute('/_authenticated/organization/structure')({
  component: Structure,
})
