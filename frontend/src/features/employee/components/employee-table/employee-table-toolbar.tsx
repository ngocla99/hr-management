import { Table } from '@tanstack/react-table'
import { IconLayoutGrid, IconList } from '@tabler/icons-react'
import { User } from '@/types/api'
import { DataTableFilterField } from '@/types/common'
import { Button } from '@/components/ui/button'
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar'

interface EmployeeTableToolbarProps<TData> {
  table: Table<TData>
  filterFields: DataTableFilterField<TData>[]
  viewMode: 'table' | 'card'
  setViewMode: (viewMode: 'table' | 'card') => void
}

export function EmployeeTableToolbar({
  table,
  filterFields,
  viewMode,
  setViewMode,
}: EmployeeTableToolbarProps<User>) {
  return (
    <div className='flex items-center justify-between gap-1.5'>
      <DataTableToolbar table={table} filterFields={filterFields} />
      <div className='bg-accent flex items-center rounded-lg border p-1'>
        <Button
          variant={viewMode === 'table' ? 'light' : 'ghost'}
          size='icon'
          onClick={() => setViewMode('table')}
          className='size-6'
        >
          <IconList className='h-4 w-4' />
        </Button>
        <Button
          variant={viewMode === 'card' ? 'light' : 'ghost'}
          size='icon'
          onClick={() => setViewMode('card')}
          className='size-6'
        >
          <IconLayoutGrid className='h-4 w-4' />
        </Button>
      </div>
    </div>
  )
}
