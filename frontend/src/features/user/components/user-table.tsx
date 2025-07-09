import React from 'react'
import {
  ColumnFiltersState,
  type PaginationState,
  RowData,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { PAGINATION } from '@/lib/constants/constant'
import { Skeleton } from '@/components/ui/skeleton'
import { DataTable } from '@/components/data-table/data-table'
import { useUsers } from '../api/get-users'
import { useDeleteUser } from '../hooks/use-user-api'
import { useUserColumns } from './user-columns'
import { UsersTableToolbar } from './user-table-toolbar'

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    className: string
  }
}

export function UserTable() {
  const columns = useUserColumns()
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: PAGINATION.DEFAULT_PAGE - 1,
    pageSize: PAGINATION.DEFAULT_LIMIT,
  })

  const { data, isLoading, error } = useUsers({
    input: {
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
    },
  })

  const users = data?.data ?? []
  const total = data?.pagination?.totalRecords ?? 0

  const deleteUserMutation = useDeleteUser({
    onSuccess: () => {
      table.resetRowSelection()
    },
  })

  const table = useReactTable({
    data: users,
    columns,
    rowCount: total,
    state: {
      pagination,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    manualPagination: true,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  const selectedRowIds = table
    .getFilteredSelectedRowModel()
    .rows.map((row) => row.original.id)

  if (isLoading) {
    return (
      <div className='space-y-2'>
        <Skeleton className='h-8 w-full' />
        <Skeleton className='h-8 w-full' />
        <Skeleton className='h-8 w-full' />
        <Skeleton className='h-8 w-full' />
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <div className='text-lg text-red-500'>Error: {error.message}</div>
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      <UsersTableToolbar
        table={table}
        onDeleteAll={(onSuccess) => {
          deleteUserMutation.mutate({ ids: selectedRowIds }, { onSuccess })
        }}
      />
      <DataTable table={table} />
    </div>
  )
}
