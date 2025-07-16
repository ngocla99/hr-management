import { useState, useMemo } from 'react'
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
import { useTranslation } from 'react-i18next'
import { DataTable } from '@/components/data-table/data-table'
import { DataTablePagination } from '@/components/data-table/data-table-pagination'
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar'
import {
  employeeStatusOptions,
  employeeTeamOptions,
} from '../constants/employee-options'
import { mockEmployees } from '../data/mock-employees'
import { Employee } from '../types/employee.types'
import { useEmployeeColumns } from './employee-columns'

interface EmployeeTableProps {
  onEmployeeView?: (employee: Employee) => void
  onEmployeeEdit?: (employee: Employee) => void
  onEmployeeDelete?: (employee: Employee) => void
  onEmployeeInvite?: (employee: Employee) => void
}

export function EmployeeTable({
  onEmployeeView,
  onEmployeeEdit,
  onEmployeeDelete,
  onEmployeeInvite,
}: EmployeeTableProps) {
  const { t } = useTranslation()

  // Table states
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  // Filter data based on column filters
  const filteredData = useMemo(() => {
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

  const columns = useEmployeeColumns({
    onView: onEmployeeView,
    onEdit: onEmployeeEdit,
    onDelete: onEmployeeDelete,
    onInvite: onEmployeeInvite,
  })

  const filterFields: DataTableFilterField<Employee>[] = [
    {
      label: 'Employee Name',
      value: 'fullName',
      placeholder: 'Search employees...',
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
      <DataTableToolbar table={table} filterFields={filterFields} />
      <div className='rounded-md border'>
        <DataTable table={table} />
      </div>
    </div>
  )
}
