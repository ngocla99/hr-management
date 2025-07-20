import React from 'react'
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table'
import { DataTableFilterField } from '@/types/common'
import { DataTable } from '@/components/data-table/data-table'
import {
  employeeRoleOptions,
  employeeStatusOptions,
  employeeTeamOptions,
  employmentTypeOptions,
} from '../constants/employee-options'
import { mockEmployees } from '../data/mock-employees'
import { Employee } from '../types/employee.types'
import { EmployeeCardView } from './employee-card-view'
import { useEmployeeColumns } from './employee-columns'
import { EmployeeTableToolbar } from './employee-table-toolbar'

export function EmployeeTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [viewMode, setViewMode] = React.useState<'table' | 'card'>('table')

  const filteredData = React.useMemo(() => {
    if (columnFilters.length === 0) return mockEmployees

    return mockEmployees.filter((employee) => {
      return columnFilters.every((filter) => {
        const value = employee[filter.id as keyof Employee]
        if (!value) return false

        if (Array.isArray(filter.value)) {
          return filter.value.includes(value as string)
        }

        if (typeof filter.value === 'string') {
          return String(value)
            .toLowerCase()
            .includes(filter.value.toLowerCase())
        }

        return true
      })
    })
  }, [columnFilters])

  const columns = useEmployeeColumns()

  const filterFields: DataTableFilterField<Employee>[] = [
    {
      label: 'Employee Name',
      value: 'fullName',
      placeholder: 'Search employees...',
    },
    {
      label: 'Employment Type',
      value: 'employmentType',
      options: employmentTypeOptions,
    },
    {
      label: 'Team',
      value: 'team',
      options: employeeTeamOptions,
    },
    {
      label: 'Status',
      value: 'status',
      options: employeeStatusOptions,
      multiple: false,
    },
    {
      label: 'Role',
      value: 'role',
      options: employeeRoleOptions,
    },
  ]

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
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

  return (
    <div className='space-y-4'>
      <EmployeeTableToolbar
        table={table}
        filterFields={filterFields}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      {viewMode === 'table' ? (
        <DataTable table={table} />
      ) : (
        <EmployeeCardView table={table} />
      )}
    </div>
  )
}
