import React from 'react'
import { AxiosError } from 'axios'
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { MutationOptions, Pagination, PaginationInput } from '@/types/common'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import {
  createProjectApi,
  deleteProjectApi,
  getProjectsApi,
  updateProjectApi,
} from '@/api/services/project'
import { QUERY_KEYS } from '@/lib/constants/constant'
import {
  CreateProjectSchema,
  DeleteProjectSchema,
  ProjectSchema,
  UpdateProjectSchema,
} from '@/lib/validations/project'
import { adaptApiProjectsToLocalProjects } from '../utils/adapters'

export const projectKeys = {
  all: [QUERY_KEYS.PROJECTS] as const,
  lists: (input: PaginationInput) =>
    [...projectKeys.all, 'list', input] as const,
}

// Get all projects
export const useProjects = (input: PaginationInput = {}) => {
  const { data, isLoading, error } = useQuery<{
    data: ProjectSchema[]
    pagination?: Pagination
  }>({
    queryKey: projectKeys.lists(input),
    queryFn: () => getProjectsApi(),
    placeholderData: keepPreviousData,
  })

  // Memoize the projects transformation to prevent infinite loops
  const projects = React.useMemo(() => {
    return adaptApiProjectsToLocalProjects(data?.data ?? [])
  }, [data?.data])

  const total = data?.pagination?.total ?? projects.length

  return {
    projects,
    total,
    isLoading,
    error,
  }
}

// Create project mutation
export const useCreateProject = ({
  onSuccess,
  onError,
}: MutationOptions = {}) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation('projects')

  return useMutation({
    mutationFn: (data: CreateProjectSchema) => createProjectApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists({}) })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DASHBOARD] })
      toast.success(t('message.success.created'))
      onSuccess?.()
    },
    onError: (error: Error) => {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : t('message.error.createFailed')
      toast.error(errorMessage)
      onError?.(error)
    },
  })
}

// Update project mutation
export const useUpdateProject = ({
  onSuccess,
  onError,
}: MutationOptions = {}) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation('projects')

  return useMutation({
    mutationFn: (data: UpdateProjectSchema) => updateProjectApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists({}) })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DASHBOARD] })
      toast.success(t('message.success.updated'))
      onSuccess?.()
    },
    onError: (error: Error) => {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : t('message.error.updateFailed')
      toast.error(errorMessage)
      onError?.(error)
    },
  })
}

// Delete project mutation
export const useDeleteProject = ({
  onSuccess,
  onError,
}: MutationOptions = {}) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation('projects')

  return useMutation({
    mutationFn: (data: DeleteProjectSchema) => deleteProjectApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists({}) })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DASHBOARD] })
      toast.success(t('message.success.deleted'))
      onSuccess?.()
    },
    onError: (error: Error) => {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : t('message.error.deleteFailed')
      toast.error(errorMessage)
      onError?.(error)
    },
  })
}
