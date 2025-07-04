import { Pagination } from '@/types/common'
import {
  AssignTaskSchema,
  CompleteTaskSchema,
  CreateTaskSchema,
  DeleteTaskSchema,
  TaskFilterSchema,
  TaskSchema,
  UpdateTaskSchema,
} from '@/lib/validations/task'
import apiClient from '../api-client'

export const getTasksApi = (
  params?: TaskFilterSchema
): Promise<{
  data: TaskSchema[]
  pagination: Pagination
}> => {
  // Map startDate and dueDate to API params if provided
  const apiParams = { ...params }
  if (params?.startDateFrom || params?.startDateTo) {
    if (params.startDateFrom) apiParams.startDate = params.startDateFrom
    if (params.startDateTo) apiParams.startDate = params.startDateTo
  }
  if (params?.dueDateFrom || params?.dueDateTo) {
    if (params.dueDateFrom) apiParams.dueDate = params.dueDateFrom
    if (params.dueDateTo) apiParams.dueDate = params.dueDateTo
  }
  return apiClient.get('/task', { params: apiParams })
}

export const createTaskApi = (input: CreateTaskSchema) => {
  return apiClient.post('/task', input)
}

export const updateTaskApi = (input: UpdateTaskSchema) => {
  return apiClient.put(`/task/${input.id}`, input.task)
}

export const assignTaskApi = (input: AssignTaskSchema) => {
  return apiClient.post('/task/assign', input)
}

export const deleteTaskApi = (input: DeleteTaskSchema) => {
  return apiClient.delete(`/task`, { data: input })
}

export const completeTaskApi = (input: CompleteTaskSchema) => {
  return apiClient.post(`/task/${input.id}/complete`, {
    donePct: input.donePct,
    status: input.status,
  })
}
