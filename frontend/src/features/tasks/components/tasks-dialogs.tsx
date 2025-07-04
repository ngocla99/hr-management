import { lazy } from 'react'
import { useTranslation } from 'react-i18next'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useTasks } from '../context/tasks-context'
import { useDeleteTask } from '../hooks/use-tasks-api'
import { TasksImportDialog } from './tasks-import-dialog'

const TasksMutateDialog = lazy(() =>
  import('./tasks-mutate-dialog').then((mod) => ({
    default: mod.TasksMutateDialog,
  }))
)

export function TasksDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useTasks()
  const { t } = useTranslation(['common', 'glossary'])

  const deleteTaskMutation = useDeleteTask({
    onSuccess: () => {
      setOpen(null)
      setCurrentRow(null)
    },
  })

  return (
    <>
      <TasksMutateDialog
        key='task-create'
        open={open === 'create'}
        onOpenChange={(isOpen) => setOpen(isOpen ? 'create' : null)}
      />

      {currentRow && (
        <>
          <TasksMutateDialog
            key={`task-update-${currentRow.id}`}
            open={open === 'update'}
            onOpenChange={(isOpen) => {
              setOpen(isOpen ? 'update' : null)
              if (!isOpen) {
                setTimeout(() => {
                  setCurrentRow(null)
                }, 500)
              }
            }}
            currentRow={currentRow}
          />

          <ConfirmDialog
            key='task-delete'
            open={open === 'delete'}
            onOpenChange={(isOpen) => {
              setOpen(isOpen ? 'delete' : null)
              if (!isOpen) {
                setTimeout(() => {
                  setCurrentRow(null)
                }, 500)
              }
            }}
            title={t('dialog.deleteTitle', { title: currentRow.title })}
            desc={t('dialog.deleteConfirm')}
            confirmText={t('delete')}
            destructive
            handleConfirm={() =>
              deleteTaskMutation.mutate({ ids: [currentRow.id] })
            }
          />
        </>
      )}

      <TasksImportDialog
        open={open === 'import'}
        onOpenChange={(isOpen) => setOpen(isOpen ? 'import' : null)}
      />
    </>
  )
}
