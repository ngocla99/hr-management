import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { showSubmittedData } from '@/lib/utils/show-submitted-data'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { User } from '../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: User
}

export function UserDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const [value, setValue] = useState('')
  const { t } = useTranslation(['users', 'common', 'glossary'])

  const handleDelete = () => {
    if (value.trim() !== currentRow.name) return

    onOpenChange(false)
    showSubmittedData(currentRow, t('message.success.deleted', { ns: 'users' }))
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.name}
      title={t('dialog.delete.title')}
      desc={t('dialog.delete.description', { name: currentRow.name })}
      confirmText={t('delete', { ns: 'common' })}
      destructive
    >
      <Label className='my-2'>
        {t('name', { ns: 'glossary' })}:
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={t('form.name.placeholder', { ns: 'users' })}
        />
      </Label>
      <Alert variant='destructive'>
        <AlertTitle>{t('warning', { ns: 'common' })}</AlertTitle>
        <AlertDescription>
          {t('dialog.deleteConfirm', { ns: 'common' })}
        </AlertDescription>
      </Alert>
    </ConfirmDialog>
  )
}
