import { z } from 'zod'

export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export const createProjectSchema = z.object({
  name: z.string().min(1, 'required'),
  description: z.string().min(1, 'required'),
})

export const updateProjectSchema = z.object({
  id: z.string(),
  project: createProjectSchema,
})

export const deleteProjectSchema = z.object({
  ids: z.array(z.string()),
})

export type ProjectSchema = z.infer<typeof projectSchema>
export type CreateProjectSchema = z.infer<typeof createProjectSchema>
export type UpdateProjectSchema = z.infer<typeof updateProjectSchema>
export type DeleteProjectSchema = z.infer<typeof deleteProjectSchema>
