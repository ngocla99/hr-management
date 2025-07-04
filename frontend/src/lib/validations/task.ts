import { z } from 'zod'

const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
})

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export const taskStatusSchema = z.union([
  z.literal('Open'),
  z.literal('InProgress'),
  z.literal('Resolved'),
  z.literal('Completed'),
])
export type TaskStatus = z.infer<typeof taskStatusSchema>

export const taskPrioritySchema = z.union([
  z.literal('Low'),
  z.literal('Medium'),
  z.literal('High'),
])
export type TaskPriority = z.infer<typeof taskPrioritySchema>

export const taskSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  title: z.string().optional(),
  description: z.string(),
  status: taskStatusSchema,
  priority: taskPrioritySchema,
  dueDate: z.coerce.date(),
  startDate: z.coerce.date(),
  donePct: z.number(),
  project: projectSchema,
  creator: userSchema,
  assignee: userSchema,
})

export const createTaskSchema = z.object({
  title: z.string({ required_error: 'required' }).min(1, 'required'),
  projectId: z.string({ required_error: 'required' }),
  description: z.string().optional(),
  status: taskStatusSchema.optional(),
  priority: taskPrioritySchema.optional(),
  dueDate: z.coerce.date().optional(),
  startDate: z.coerce.date().optional(),
  donePct: z.number().min(0).max(100).optional(),
  assigneeId: z.string().optional(),
})

export const updateTaskSchema = z.object({
  id: z.string(),
  task: createTaskSchema,
})

export const deleteTaskSchema = z.object({
  ids: z.array(z.string()),
})

export const assignTaskSchema = z.object({
  taskId: z.string(),
  assigneeId: z.string(),
})

export const completeTaskSchema = z.object({
  id: z.string(),
  donePct: z.number().min(0).max(100),
  status: taskStatusSchema,
})

export const taskFilterSchema = z.object({
  projectId: z.string().optional(),
  creatorId: z.string().optional(),
  assigneeId: z.string().optional(),
  status: taskStatusSchema.optional(),
  priority: taskPrioritySchema.optional(),
  dueDateFrom: z.string().optional(),
  dueDateTo: z.string().optional(),
  startDateFrom: z.string().optional(),
  startDateTo: z.string().optional(),
  // Add direct startDate and dueDate for API filtering
  startDate: z.string().optional(),
  dueDate: z.string().optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
})

export type TaskSchema = z.infer<typeof taskSchema>
export type CreateTaskSchema = z.infer<typeof createTaskSchema>
export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>
export type DeleteTaskSchema = z.infer<typeof deleteTaskSchema>
export type AssignTaskSchema = z.infer<typeof assignTaskSchema>
export type CompleteTaskSchema = z.infer<typeof completeTaskSchema>
export type TaskFilterSchema = z.infer<typeof taskFilterSchema>
