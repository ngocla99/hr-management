import { z } from 'zod'

export const meSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  username: z.string(),
  role: z.enum(['employee', 'admin']),
  profile: z.object({
    id: z.string(),
    avatar: z.string(),
    bio: z.string(),
  }),
})

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  username: z.string(),
  status: z.string(),
  role: z.enum(['employee', 'admin']),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export const createUserSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
})

export const deleteUserSchema = z.object({
  ids: z.array(z.string()),
})

export type MeSchema = z.infer<typeof meSchema>
export type UserSchema = z.infer<typeof userSchema>
export type CreateUserSchema = z.infer<typeof createUserSchema>
export type DeleteUserSchema = z.infer<typeof deleteUserSchema>
