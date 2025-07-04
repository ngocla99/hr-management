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
import { useDeleteProject, useProjects } from '../hooks/use-projects-api'
import { useProjectsColumns } from './projects-columns'
import { ProjectsTableToolbar } from './projects-table-toolbar'

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    className: string
  }
}

export function ProjectsTable() {
  const columns = useProjectsColumns()
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

  const { projects, isLoading, error } = useProjects()
  const deleteProjectMutation = useDeleteProject()

  // Memoize columns to prevent unnecessary re-renders
  const memoizedColumns = React.useMemo(() => columns, [columns])

  const table = useReactTable({
    data: projects,
    columns: memoizedColumns,
    state: {
      pagination,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
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
    .getSelectedRowModel()
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
      <ProjectsTableToolbar
        table={table}
        onDeleteAll={() =>
          deleteProjectMutation.mutate({ ids: selectedRowIds })
        }
      />
      <DataTable table={table} />
    </div>
  )
}
