import {
  CreateProjectSchema,
  DeleteProjectSchema,
  ProjectSchema,
  UpdateProjectSchema,
} from '@/lib/validations/project'
import apiClient from '../api-client'

export const getProjectsApi = (): Promise<{ data: ProjectSchema[] }> => {
  return apiClient.get('/project')
}

export const createProjectApi = (input: CreateProjectSchema) => {
  return apiClient.post('/project', input)
}

export const updateProjectApi = (input: UpdateProjectSchema) => {
  return apiClient.put(`/project/${input.id}`, input.project)
}

export const deleteProjectApi = (input: DeleteProjectSchema) => {
  return apiClient.delete(`/project`, { data: input })
}
