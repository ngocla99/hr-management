import { useState } from 'react'
import { User } from '@/types/api'
import { Trans, useTranslation } from 'react-i18next'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useDeleteUser } from '../api/delete-user'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: User
}

export function UserDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const [value, setValue] = useState('')
  const { t } = useTranslation()

  const deleteUserMutation = useDeleteUser({
    mutationConfig: {
      onSuccess: () => {
        onOpenChange(false)
      },
    },
  })

  const handleDelete = () => {
    if (value.trim() !== currentRow.username) return
    if (deleteUserMutation.isPending) return
    deleteUserMutation.mutate({ id: currentRow.id })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.username}
      title={t('dialog.delete.title', { ns: 'users' })}
      desc={
        <Trans
          i18nKey='dialog.delete.description'
          ns='users'
          values={{ name: currentRow.username }}
          components={{
            strong: <strong />,
            br: <br />,
          }}
        />
      }
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
          <Trans
            i18nKey='dialog.deleteConfirm'
            ns='common'
            components={{
              br: <br />,
            }}
          />
        </AlertDescription>
      </Alert>
    </ConfirmDialog>
  )
}
