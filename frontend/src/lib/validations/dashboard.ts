import { z } from 'zod'

export const DashboardOverviewSchema = z.object({
  totalUsers: z.number(),
  totalProjects: z.number(),
  totalTasks: z.number(),
  tasksByStatus: z.record(z.string(), z.number()),
  recentTasks: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      status: z.string(),
      dueDate: z.string(),
      project: z.object({
        id: z.string().optional(),
        name: z.string().optional(),
      }),
      assignee: z.object({
        id: z.string().optional(),
        name: z.string().optional(),
      }),
    })
  ),
  recentProjects: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      taskCount: z.number(),
      completedTaskCount: z.number(),
    })
  ),
})

export type DashboardOverviewSchema = z.infer<typeof DashboardOverviewSchema>
