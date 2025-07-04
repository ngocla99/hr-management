import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useDeleteProject } from '../hooks/use-projects-api'
import { Project } from '../data/schema'
import { useTranslation } from 'react-i18next'

interface ProjectsDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Project
}

export function ProjectsDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: ProjectsDeleteDialogProps) {
  const { t } = useTranslation(['projects', 'common'])
  const deleteProjectMutation = useDeleteProject({
    onSuccess: () => {
      onOpenChange(false)
    },
  })

  const handleDelete = () => {
    deleteProjectMutation.mutate({
      ids: [currentRow.id],
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{t('dialog.delete.title')}</DialogTitle>
          <DialogDescription>
            {t('dialog.delete.description', { name: currentRow.name })}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type='button'
            variant='outline'
            onClick={() => onOpenChange(false)}
          >
            {t('cancel', { ns: 'common' })}
          </Button>
          <Button
            type='button'
            variant='destructive'
            onClick={handleDelete}
            disabled={deleteProjectMutation.isPending}
          >
            {deleteProjectMutation.isPending ? t('deleting', { ns: 'common' }) : t('delete', { ns: 'common' })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}