import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import {
  CreateProjectSchema,
  createProjectSchema,
} from '@/lib/validations/project'
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
import { Textarea } from '@/components/ui/textarea'
import { Project } from '../data/schema'
import { useCreateProject, useUpdateProject } from '../hooks/use-projects-api'

interface ProjectsMutateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Project // If provided, it's edit mode
}

export function ProjectsMutateDialog({
  open,
  onOpenChange,
  currentRow,
}: ProjectsMutateDialogProps) {
  const { t } = useTranslation(['projects', 'common', 'glossary'])
  const isEdit = !!currentRow

  const createProjectMutation = useCreateProject({
    onSuccess: () => {
      form.reset()
      onOpenChange(false)
    },
  })

  const updateProjectMutation = useUpdateProject({
    onSuccess: () => {
      form.reset()
      onOpenChange(false)
    },
  })

  const form = useForm<CreateProjectSchema>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: '',
      description: '',
      //   status: 'active',
      //   priority: 'medium',
    },
  })

  // Reset form values when currentRow changes or dialog opens
  useEffect(() => {
    if (open) {
      if (isEdit && currentRow) {
        form.reset({
          name: currentRow.name,
          description: currentRow.description,
          //   status: currentRow.status,
          //   priority: currentRow.priority,
        })
      } else {
        form.reset({
          name: '',
          description: '',
          //   status: 'active',
          //   priority: 'medium',
        })
      }
    }
  }, [open, isEdit, currentRow, form])

  const onSubmit = async (values: CreateProjectSchema) => {
    if (isEdit && currentRow) {
      updateProjectMutation.mutate({
        id: currentRow.id,
        project: {
          name: values.name,
          description: values.description,
        },
      })
    } else {
      createProjectMutation.mutate(values)
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      form.reset()
    }
    onOpenChange(newOpen)
  }

  const isLoading =
    createProjectMutation.isPending || updateProjectMutation.isPending

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className='sm:max-w-[525px]'>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? t('dialog.edit.title') : t('dialog.create.title')}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? t('dialog.edit.description')
              : t('dialog.create.description')}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('name', { ns: 'glossary' })}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('form.name.placeholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('description', { ns: 'glossary' })}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('form.description.placeholder')}
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select status' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='active'>Active</SelectItem>
                      <SelectItem value='completed'>Completed</SelectItem>
                      <SelectItem value='paused'>Paused</SelectItem>
                      <SelectItem value='cancelled'>Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='priority'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select priority' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='low'>Low</SelectItem>
                      <SelectItem value='medium'>Medium</SelectItem>
                      <SelectItem value='high'>High</SelectItem>
                      <SelectItem value='urgent'>Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <DialogFooter>
              <Button
                type='button'
                variant='outline'
                onClick={() => handleOpenChange(false)}
              >
                {t('cancel', { ns: 'common' })}
              </Button>
              <Button type='submit' disabled={isLoading}>
                {isLoading
                  ? isEdit
                    ? t('updating', { ns: 'common' })
                    : t('creating', { ns: 'common' })
                  : isEdit
                    ? t('update', { ns: 'common' })
                    : t('create', { ns: 'common' })}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
