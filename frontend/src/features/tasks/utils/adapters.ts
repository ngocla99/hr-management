import { TaskSchema } from '@/lib/validations/task'
import { UserSchema } from '@/lib/validations/user'
import { IEvent, IUser } from '@/components/calendar/interfaces'

/**
 * Transforms API task data to local Task format
 * @param apiTask - Task data from API
 * @returns Transformed task data for local use
 */
export const adaptApiTaskToLocalTask = (apiTask: TaskSchema): TaskSchema => {
  return {
    id: apiTask.id,
    title: apiTask.name,
    description: apiTask.description,
    status: apiTask.status,
    priority: apiTask.priority,
    dueDate: apiTask.dueDate,
    startDate: apiTask.startDate,
    donePct: apiTask.donePct,
    project: apiTask.project,
    creator: apiTask.creator,
    assignee: apiTask.assignee,
  }
}

/**
 * Transforms multiple API tasks to local format
 * @param apiTasks - Array of tasks from API
 * @returns Array of transformed tasks for local use
 */
export const adaptApiTasksToLocalTasks = (
  apiTasks: TaskSchema[]
): TaskSchema[] => {
  return apiTasks.map(adaptApiTaskToLocalTask)
}

export const adaptApiUsersToCalendarUsers = (
  apiUsers: UserSchema[]
): IUser[] => {
  return apiUsers.map((apiUser, index) => {
    return {
      id: apiUser.id,
      name: apiUser.name,
      picturePath: `/avatars/0${index + 1}.png`,
    }
  })
}

/**
 * Transforms API tasks to calendar events
 * @param apiTasks - Array of tasks from API
 * @returns Array of calendar events
 */

export const adaptApiTasksToCalendarTasks = (
  apiTasks: TaskSchema[],
  users: IUser[]
): IEvent[] => {
  if (!users.length || !apiTasks.length) return []

  return apiTasks.map((task, idx) => {
    // Find user for event (assignee or fallback)
    const user = users.find((u) => u.id === task.assignee?.id) ||
      users[0] || {
        id: 'unknown',
        name: 'Unknown',
        picturePath: null,
      }
    return {
      id: idx + 1,
      startDate:
        typeof task.startDate === 'string'
          ? task.startDate
          : (task.startDate?.toISOString?.() ?? ''),
      endDate:
        typeof task.dueDate === 'string'
          ? task.dueDate
          : (task.dueDate?.toISOString?.() ?? ''),
      title: task.title || task.name || 'Untitled Task',
      color: 'blue',
      description: task.description || '',
      user,
    }
  })
}
