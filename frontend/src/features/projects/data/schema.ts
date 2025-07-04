import { z } from 'zod'

const projectStatusSchema = z.union([
  z.literal('active'),
  z.literal('completed'),
  z.literal('paused'),
  z.literal('cancelled'),
])
export type ProjectStatus = z.infer<typeof projectStatusSchema>

const projectPrioritySchema = z.union([
  z.literal('Low'),
  z.literal('Medium'),
  z.literal('High'),
])
export type ProjectPriority = z.infer<typeof projectPrioritySchema>

const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  status: projectStatusSchema,
  priority: projectPrioritySchema,
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Project = z.infer<typeof projectSchema>

export const projectListSchema = z.array(projectSchema) 