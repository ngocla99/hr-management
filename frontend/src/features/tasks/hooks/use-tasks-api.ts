import { AxiosError } from 'axios'
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { MutationOptions, Pagination } from '@/types/common'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import {
  assignTaskApi,
  completeTaskApi,
  createTaskApi,
  deleteTaskApi,
  getTasksApi,
  updateTaskApi,
} from '@/api/services/task'
import { QUERY_KEYS } from '@/lib/constants/constant'
import {
  AssignTaskSchema,
  CompleteTaskSchema,
  CreateTaskSchema,
  DeleteTaskSchema,
  TaskFilterSchema,
  TaskSchema,
  UpdateTaskSchema,
} from '@/lib/validations/task'
import { adaptApiTasksToLocalTasks } from '../utils/adapters'

export const taskKeys = {
  all: [QUERY_KEYS.TASKS] as const,
  lists: (input: TaskFilterSchema) => [...taskKeys.all, 'list', input] as const,
}

export const useTasks = (input: TaskFilterSchema) => {
  const { data, isLoading, error } = useQuery<{
    data: TaskSchema[]
    pagination: Pagination
  }>({
    queryKey: taskKeys.lists(input),
    queryFn: () =>
      getTasksApi({
        page: input.page,
        limit: input.limit,
        projectId: input.projectId,
        creatorId: input.creatorId,
        assigneeId: input.assigneeId,
        status: input.status,
        priority: input.priority,
        dueDateFrom: input.dueDateFrom,
        dueDateTo: input.dueDateTo,
        startDateFrom: input.startDateFrom,
        startDateTo: input.startDateTo,
        // Pass startDate and dueDate for API filtering
        startDate: input.startDate,
        dueDate: input.dueDate,
        sortBy: input.sortBy,
        sortOrder: input.sortOrder,
      }),
    placeholderData: keepPreviousData,
  })

  const tasks = adaptApiTasksToLocalTasks(data?.data ?? [])
  const total = data?.pagination?.total ?? 0

  return {
    tasks,
    total,
    pagination: data?.pagination,
    isLoading,
    error,
  }
}

export const useCreateTask = ({ onSuccess, onError }: MutationOptions = {}) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation('tasks')

  return useMutation({
    mutationFn: (data: CreateTaskSchema) => createTaskApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists({}) })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DASHBOARD] })
      toast.success(t('message.success.saved'))
      onSuccess?.()
    },
    onError: (error: Error) => {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : t('message.error.saveFailed')
      toast.error(errorMessage)
      onError?.(error)
    },
  })
}

export const useUpdateTask = ({ onSuccess, onError }: MutationOptions = {}) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation('tasks')

  return useMutation({
    mutationFn: (data: UpdateTaskSchema) => updateTaskApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists({}) })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DASHBOARD] })
      toast.success(t('message.success.saved'))
      onSuccess?.()
    },
    onError: (error: Error) => {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : t('message.error.saveFailed')
      toast.error(errorMessage)
      onError?.(error)
    },
  })
}

export const useAssignTask = ({ onSuccess, onError }: MutationOptions = {}) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation('tasks')

  return useMutation({
    mutationFn: (data: AssignTaskSchema) => assignTaskApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists({}) })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DASHBOARD] })
      toast.success(t('message.success.saved'))
      onSuccess?.()
    },
    onError: (error: Error) => {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : t('message.error.saveFailed')
      toast.error(errorMessage)
      onError?.(error)
    },
  })
}

export const useDeleteTask = ({ onSuccess, onError }: MutationOptions = {}) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation('tasks')

  return useMutation({
    mutationFn: (data: DeleteTaskSchema) => deleteTaskApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists({}) })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DASHBOARD] })
      toast.success(t('message.success.deleted'))
      onSuccess?.()
    },
    onError: (error: Error) => {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : t('message.error.saveFailed')
      toast.error(errorMessage)
      onError?.(error)
    },
  })
}

export const useCompleteTask = ({
  onSuccess,
  onError,
}: MutationOptions = {}) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation('tasks')

  return useMutation({
    mutationFn: (data: CompleteTaskSchema) => completeTaskApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists({}) })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DASHBOARD] })
      toast.success(t('message.success.saved'))
      onSuccess?.()
    },
    onError: (error: Error) => {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.error || error.message
          : t('message.error.saveFailed')
      toast.error(errorMessage)
      onError?.(error)
    },
  })
}
