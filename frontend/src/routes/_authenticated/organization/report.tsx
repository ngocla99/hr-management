import { createFileRoute } from '@tanstack/react-router'
import Report from '@/features/report'

export const Route = createFileRoute('/_authenticated/organization/report')({
  component: Report,
})
