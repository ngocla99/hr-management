import { z } from 'zod'
import { USER_ROLES } from '../constants/constants'

const userStatusSchema = z.union([
  z.literal('active'),
  z.literal('inactive'),
  z.literal('suspended'),
])
export type UserStatus = z.infer<typeof userStatusSchema>

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  status: userStatusSchema,
  role: z.enum(USER_ROLES),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type User = z.infer<typeof userSchema>

export const userListSchema = z.array(userSchema)
