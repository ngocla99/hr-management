import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { getProjectsApi } from '@/api/services/project'
import { createTaskApi, updateTaskApi } from '@/api/services/task'
import { getUsersApi } from '@/api/services/user'
import { QUERY_KEYS } from '@/lib/constants/constant'
import {
  CreateTaskSchema,
  createTaskSchema,
  TaskPriority,
  TaskSchema,
  TaskStatus,
  UpdateTaskSchema,
} from '@/lib/validations/task'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FormDatePicker } from '@/components/form-field/form-date-picker'
import { FormInput } from '@/components/form-field/form-input'
import { FormSelect } from '@/components/form-field/form-select'
import { FormTextarea } from '@/components/form-field/form-textarea'
import { priorityOptions, statusOptions } from '../data/data'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: TaskSchema
}

export function TasksMutateDialog({ open, onOpenChange, currentRow }: Props) {
  const isUpdate = !!currentRow
  const queryClient = useQueryClient()
  const { t } = useTranslation(['common', 'glossary', 'tasks', 'validation'])

  const form = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: currentRow
      ? {
          title: currentRow.title,
          projectId: currentRow.project.id,
          description: currentRow.description,
          status: currentRow.status as TaskStatus,
          priority: currentRow.priority as TaskPriority,
          dueDate: currentRow.dueDate,
          startDate: currentRow.startDate,
          donePct: currentRow.donePct,
          assigneeId: currentRow.assignee?.id,
        }
      : {
          title: '',
          projectId: undefined,
          description: '',
          status: 'Open',
          priority: 'Medium',
          dueDate: new Date(),
          startDate: new Date(),
          donePct: 0,
          assigneeId: undefined,
        },
  })

  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjectsApi,
  })

  const projectOptions = (projects?.data ?? []).map((project) => ({
    label: project.name,
    value: project.id,
  }))

  const { data: users } = useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: () => getUsersApi(),
  })
  const userOptions = (users?.data ?? []).map((user) => ({
    label: user.name,
    value: user.id,
  }))

  const createTaskMutation = useMutation({
    mutationFn: createTaskApi,
    onSuccess,
    onError,
  })

  const updateTaskMutation = useMutation({
    mutationFn: (input: UpdateTaskSchema) => updateTaskApi(input),
    onSuccess,
    onError,
  })

  function onSuccess() {
    queryClient.invalidateQueries({ queryKey: ['tasks'] })
    onOpenChange(false)
    form.reset()
    toast.success(t('message.saveSuccess', { ns: 'common' }))
  }

  function onError(error: AxiosError) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : t('message.saveError', { ns: 'common' })
    toast.error(errorMessage)
  }

  const onSubmit = (data: CreateTaskSchema) => {
    const formattedData = {
      ...data,
      dueDate: data.dueDate,
      startDate: data.startDate,
    }
    if (isUpdate && currentRow) {
      updateTaskMutation.mutate({ id: currentRow.id, task: formattedData })
    } else {
      createTaskMutation.mutate(formattedData)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        form.reset()
      }}
    >
      <DialogContent className='max-h-[90vh] max-w-2xl overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>
            {isUpdate
              ? t('dialog.update.title', { ns: 'tasks' })
              : t('dialog.create.title', { ns: 'tasks' })}
          </DialogTitle>
          <DialogDescription>
            {isUpdate
              ? t('dialog.update.description', { ns: 'tasks' })
              : t('dialog.create.description', { ns: 'tasks' })}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id='tasks-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-5'
          >
            <div className='grid grid-cols-2 gap-4'>
              <FormInput
                name='title'
                label={t('title', { ns: 'glossary' })}
                placeholder={t('form.enterTitle', { ns: 'glossary' })}
                required
              />
              <FormSelect
                className='w-full'
                name='projectId'
                label={t('project', { ns: 'glossary' })}
                placeholder={t('form.selectProject', { ns: 'glossary' })}
                items={projectOptions}
                required
              />
            </div>

            <FormTextarea
              name='description'
              label={t('description', { ns: 'glossary' })}
              placeholder={t('form.enterDescription', { ns: 'glossary' })}
            />

            <div className='grid grid-cols-2 gap-4'>
              <FormSelect
                className='w-full'
                name='status'
                label={t('status', { ns: 'glossary' })}
                placeholder={t('form.selectStatus', { ns: 'glossary' })}
                items={statusOptions}
              />
              <FormSelect
                className='w-full'
                name='priority'
                label={t('priority', { ns: 'glossary' })}
                placeholder={t('form.selectPriority', { ns: 'glossary' })}
                items={priorityOptions}
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <FormDatePicker
                name='startDate'
                label={t('date.start', { ns: 'glossary' })}
                placeholder={t('form.selectStartDate', { ns: 'glossary' })}
              />
              <FormDatePicker
                name='dueDate'
                label={t('date.due', { ns: 'glossary' })}
                placeholder={t('form.selectDueDate', { ns: 'glossary' })}
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <FormSelect
                className='w-full'
                name='assigneeId'
                label={t('assignee', { ns: 'glossary' })}
                placeholder={t('form.selectAssignee', { ns: 'glossary' })}
                items={userOptions}
              />
              <FormField
                control={form.control}
                name='donePct'
                render={({ field }) => (
                  <FormItem className='space-y-1'>
                    <FormLabel>{t('donePct', { ns: 'glossary' })}</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        min={0}
                        max={100}
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter className='gap-2'>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            {t('cancel', { ns: 'common' })}
          </Button>
          <Button
            type='submit'
            form='tasks-form'
            disabled={
              createTaskMutation.isPending || updateTaskMutation.isPending
            }
            onClick={form.handleSubmit(onSubmit)}
          >
            {isUpdate
              ? t('edit', { ns: 'common' })
              : t('create', { ns: 'common' })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
