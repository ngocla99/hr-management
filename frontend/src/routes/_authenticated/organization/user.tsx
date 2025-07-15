import { z } from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { PAGINATION } from '@/lib/constants/constant'
import User from '@/features/user'
import {
  USER_ROLES,
  USER_STATUSES,
} from '@/features/user/constants/user-constants'

const userSearchSchema = z.object({
  page: z.number().optional().default(PAGINATION.DEFAULT_PAGE),
  limit: z.number().optional().default(PAGINATION.DEFAULT_LIMIT),
  sort: z.string().optional().default('createdAt.desc'),
  status: z.enum(USER_STATUSES).optional(),
  role: z.array(z.enum(USER_ROLES)).optional(),
  username: z.string().optional(),
  createdAtFrom: z.string().optional(),
  createdAtTo: z.string().optional(),
})

export type UserSearch = z.infer<typeof userSearchSchema>

export const Route = createFileRoute('/_authenticated/organization/user')({
  validateSearch: (search) => userSearchSchema.parse(search),
  component: User,
})
