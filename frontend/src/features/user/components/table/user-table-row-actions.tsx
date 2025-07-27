import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { getRouteApi } from '@tanstack/react-router'
import { Row } from '@tanstack/react-table'
import { IconEdit, IconTrash, IconUser } from '@tabler/icons-react'
import { Route as UserRoute } from '@/routes/_authenticated/organization/user'
import { UserApi } from '@/types/api'
import { Trans, useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import confirm from '@/components/confirm'
import { useActivateUser } from '@/features/user/api/activate-user'
import { UsersInput } from '@/features/user/api/get-users'
import { useSuspendUser } from '@/features/user/api/suspend-user'
import { useUser } from '@/features/user/context/user-context'

interface UsersTableRowActionsProps {
  row: Row<UserApi>
}

const route = getRouteApi(UserRoute.id)
export function UsersTableRowActions({ row }: UsersTableRowActionsProps) {
  const { t } = useTranslation()
  const { setOpen, setCurrentRow } = useUser()
  const searchParams = route.useSearch() as UsersInput

  const suspendUserMutation = useSuspendUser({
    inputQuery: { ...searchParams },
  })
  const activateUserMutation = useActivateUser({
    inputQuery: { ...searchParams },
  })

  const handleSuspendUser = () => {
    if (suspendUserMutation.isPending) return

    confirm({
      type: 'warning',
      title: t('suspend', { ns: 'common' }),
      description: (
        <Trans
          i18nKey='suspendDescription'
          ns='users'
          values={{ name: row.original.username }}
          components={{
            strong: <strong />,
          }}
        />
      ),
      confirmText: t('confirm', { ns: 'common' }),
      cancelText: t('cancel', { ns: 'common' }),
      onConfirm: () => {
        suspendUserMutation.mutate({ id: row.original.id })
      },
    })
  }

  const handleActivateUser = () => {
    if (activateUserMutation.isPending) return
    activateUserMutation.mutate({ id: row.original.id })
  }

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='data-[state=open]:bg-muted flex h-8 w-8 p-0'
          >
            <DotsHorizontalIcon className='h-4 w-4' />
            <span className='sr-only'>Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[160px]'>
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(row.original)
              setOpen('edit')
            }}
          >
            {t('edit', { ns: 'common' })}
            <DropdownMenuShortcut>
              <IconEdit size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              if (row.original.status === 'active') {
                handleSuspendUser()
              } else {
                handleActivateUser()
              }
            }}
          >
            {row.original.status === 'active'
              ? t('suspend', { ns: 'common' })
              : t('activate', { ns: 'common' })}
            <DropdownMenuShortcut>
              <IconUser size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setCurrentRow(row.original)
              setOpen('delete')
            }}
            className='text-red-500!'
          >
            {t('delete', { ns: 'common' })}
            <DropdownMenuShortcut>
              <IconTrash size={16} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
