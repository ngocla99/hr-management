import { useState } from 'react'
import { getRouteApi } from '@tanstack/react-router'
import { Route as UserRoute } from '@/routes/_authenticated/organization/user'
import { User } from '@/types/api'
import { Trans, useTranslation } from 'react-i18next'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useDeleteUser } from '@/features/user/api/delete-user'
import { UsersInput } from '@/features/user/api/get-users'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: User
}

const route = getRouteApi(UserRoute.id)

export function UserDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const [value, setValue] = useState('')
  const { t } = useTranslation()
  const searchParams = route.useSearch() as UsersInput

  const deleteUserMutation = useDeleteUser({
    inputQuery: {
      ...searchParams,
    },
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
          placeholder={t('username', { ns: 'glossary' })}
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
