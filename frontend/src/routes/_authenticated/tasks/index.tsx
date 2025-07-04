import { z } from 'zod'
import { endOfMonth, format, startOfMonth } from 'date-fns'
import { createFileRoute } from '@tanstack/react-router'
import { PAGINATION } from '@/lib/constants/constant'
import { taskPrioritySchema, taskStatusSchema } from '@/lib/validations/task'
import Tasks from '@/features/tasks'

const now = new Date()
const defaultStartDate = format(startOfMonth(now), 'yyyy-MM-dd')
const defaultDueDate = format(endOfMonth(now), 'yyyy-MM-dd')

const taskSearchSchema = z.object({
  page: z.number().optional().default(PAGINATION.DEFAULT_PAGE),
  limit: z.number().optional().default(PAGINATION.DEFAULT_LIMIT),
  sort: z.string().optional().default('createdAt.desc'),
  status: taskStatusSchema.optional(),
  priority: taskPrioritySchema.optional(),
  startDate: z.string().optional().default(defaultStartDate),
  dueDate: z.string().optional().default(defaultDueDate),
})

export type TaskSearch = z.infer<typeof taskSearchSchema>

export const Route = createFileRoute('/_authenticated/tasks/')({
  validateSearch: (search) => taskSearchSchema.parse(search),
  component: Tasks,
})
