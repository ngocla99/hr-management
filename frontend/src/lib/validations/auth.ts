import { z } from 'zod'

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const authRequestSchema = authSchema.extend({
  deviceName: z.string().optional(),
  ip: z.string().optional(),
})

export const authResponseSchema = z.object({
  userId: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
  tokenExpires: z.number(),
})

export type AuthSchema = z.infer<typeof authSchema>
export type AuthRequestSchema = z.infer<typeof authRequestSchema>
export type AuthResponseSchema = z.infer<typeof authResponseSchema>
