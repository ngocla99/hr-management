import { z } from 'zod'

export const loginReqSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const loginResSchema = z.object({
  userId: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
  tokenExpires: z.number(),
})

export const registerReqSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
})

export const registerResSchema = z.object({
  userId: z.string(),
})

export type LoginReqSchema = z.infer<typeof loginReqSchema>
export type LoginResSchema = z.infer<typeof loginResSchema>
export type RegisterReqSchema = z.infer<typeof registerReqSchema>
export type RegisterResSchema = z.infer<typeof registerResSchema>
