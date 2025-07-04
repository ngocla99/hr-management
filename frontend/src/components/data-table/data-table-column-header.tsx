import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
} from '@radix-ui/react-icons'
import { type Column } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTranslation } from 'react-i18next'

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const { t } = useTranslation('common')

  if (!column.getCanSort() && !column.getCanHide()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label={
              column.getIsSorted() === 'desc'
                ? t('table.sortDescLabel')
                : column.getIsSorted() === 'asc'
                  ? t('table.sortAscLabel')
                  : t('table.sortNoneLabel')
            }
            variant='ghost'
            size='sm'
            className='data-[state=open]:bg-accent -ml-3 h-8'
          >
            <span>{title}</span>
            {column.getCanSort() && column.getIsSorted() === 'desc' ? (
              <ArrowDownIcon className='ml-2 size-4' aria-hidden='true' />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUpIcon className='ml-2 size-4' aria-hidden='true' />
            ) : (
              <CaretSortIcon className='ml-2 size-4' aria-hidden='true' />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          {column.getCanSort() && (
            <>
              <DropdownMenuItem
                aria-label={t('table.sortAsc')}
                onClick={() => column.toggleSorting(false)}
              >
                <ArrowUpIcon
                  className='text-muted-foreground/70 mr-2 size-3.5'
                  aria-hidden='true'
                />
                {t('table.sortAsc')}
              </DropdownMenuItem>
              <DropdownMenuItem
                aria-label={t('table.sortDesc')}
                onClick={() => column.toggleSorting(true)}
              >
                <ArrowDownIcon
                  className='text-muted-foreground/70 mr-2 size-3.5'
                  aria-hidden='true'
                />
                {t('table.sortDesc')}
              </DropdownMenuItem>
            </>
          )}
          {column.getCanSort() && column.getCanHide() && (
            <DropdownMenuSeparator />
          )}
          {column.getCanHide() && (
            <DropdownMenuItem
              aria-label={t('table.hideColumn')}
              onClick={() => column.toggleVisibility(false)}
            >
              <EyeNoneIcon
                className='text-muted-foreground/70 mr-2 size-3.5'
                aria-hidden='true'
              />
              {t('table.hideColumn')}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
