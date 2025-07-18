import { useState, useMemo } from 'react'
import {
  IconDotsVertical,
  IconEdit,
  IconEye,
  IconMail,
  IconTrash,
  IconPhone,
  IconMapPin,
} from '@tabler/icons-react'
import { DataTableFilterField } from '@/types/common'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar'
import {
  employeeStatusStyles,
  employeeStatusOptions,
  employeeTeamOptions,
} from '../constants/employee-options'
import { mockEmployees } from '../data/mock-employees'
import { Employee } from '../types/employee.types'

interface EmployeeCardViewProps {
  onEmployeeView?: (employee: Employee) => void
  onEmployeeEdit?: (employee: Employee) => void
  onEmployeeDelete?: (employee: Employee) => void
  onEmployeeInvite?: (employee: Employee) => void
}

interface EmployeeCardProps {
  employee: Employee
  isSelected?: boolean
  onSelect?: (selected: boolean) => void
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
  onInvite?: () => void
}

function EmployeeCard({
  employee,
  isSelected,
  onSelect,
  onView,
  onEdit,
  onDelete,
  onInvite,
}: EmployeeCardProps) {
  const { t } = useTranslation()
  const badgeColor = employeeStatusStyles.get(employee.status)

  return (
    <Card className='transition-shadow hover:shadow-md'>
      <CardContent className='p-6'>
        <div className='mb-4 flex items-start justify-between'>
          <div className='flex items-center space-x-3'>
            <Checkbox
              checked={isSelected}
              onCheckedChange={onSelect}
              className='mt-1'
            />
            <Avatar className='h-12 w-12'>
              <AvatarImage src={employee.avatar} alt={employee.fullName} />
              <AvatarFallback>
                {employee.firstName.charAt(0)}
                {employee.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
                <IconDotsVertical className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={onView}>
                <IconEye className='mr-2 h-4 w-4' />
                {t('view', { ns: 'common' })}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onEdit}>
                <IconEdit className='mr-2 h-4 w-4' />
                {t('edit', { ns: 'common' })}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onInvite}>
                <IconMail className='mr-2 h-4 w-4' />
                {t('inviteEmail', { ns: 'common' })}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onDelete} className='text-red-600'>
                <IconTrash className='mr-2 h-4 w-4' />
                {t('delete', { ns: 'common' })}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className='space-y-3'>
          <div>
            <h3 className='text-lg font-semibold'>{employee.fullName}</h3>
            <p className='text-sm text-gray-600'>{employee.jobTitle}</p>
          </div>

          <div className='space-y-2'>
            <div className='flex items-center space-x-2 text-sm'>
              <IconMail className='h-4 w-4 text-gray-400' />
              <span className='text-gray-600'>{employee.email}</span>
            </div>
            <div className='flex items-center space-x-2 text-sm'>
              <IconPhone className='h-4 w-4 text-gray-400' />
              <span className='text-gray-600'>{employee.phone}</span>
            </div>
          </div>

          <div className='flex items-center justify-between'>
            <div className='space-y-1'>
              <div className='text-xs text-gray-500'>Department</div>
              <div className='text-sm font-medium'>{employee.department}</div>
            </div>
            <div className='space-y-1'>
              <div className='text-xs text-gray-500'>Date Hired</div>
              <div className='text-sm'>{employee.dateJoined}</div>
            </div>
          </div>

          <div className='flex items-center justify-between'>
            <div className='space-y-1'>
              <div className='text-xs text-gray-500'>Team</div>
              <div className='text-sm font-medium'>{employee.team}</div>
            </div>
            <Badge variant='outline' className={cn('capitalize', badgeColor)}>
              {t(('status.' + employee.status.replace('_', '')) as any, {
                ns: 'glossary',
              })}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function EmployeeCardView({
  onEmployeeView,
  onEmployeeEdit,
  onEmployeeDelete,
  onEmployeeInvite,
}: EmployeeCardViewProps) {
  const { t } = useTranslation()
  const [selectedEmployees, setSelectedEmployees] = useState<Set<string>>(
    new Set()
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string[]>([])
  const [teamFilter, setTeamFilter] = useState<string[]>([])

  // Filter data based on search and filters
  const filteredEmployees = useMemo(() => {
    return mockEmployees.filter((employee) => {
      const matchesSearch =
        searchQuery === '' ||
        employee.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus =
        statusFilter.length === 0 || statusFilter.includes(employee.status)
      const matchesTeam =
        teamFilter.length === 0 || teamFilter.includes(employee.team)

      return matchesSearch && matchesStatus && matchesTeam
    })
  }, [searchQuery, statusFilter, teamFilter])

  const handleSelectEmployee = (employeeId: string, selected: boolean) => {
    const newSelected = new Set(selectedEmployees)
    if (selected) {
      newSelected.add(employeeId)
    } else {
      newSelected.delete(employeeId)
    }
    setSelectedEmployees(newSelected)
  }

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedEmployees(new Set(filteredEmployees.map((emp) => emp.id)))
    } else {
      setSelectedEmployees(new Set())
    }
  }

  const filterFields: DataTableFilterField<Employee>[] = [
    {
      label: t('employeeName', { ns: 'glossary' }),
      value: 'fullName',
      placeholder: t('searchEmployees', { ns: 'common' }),
    },
    {
      label: t('team', { ns: 'glossary' }),
      value: 'team',
      options: employeeTeamOptions,
    },
    {
      label: t('status', { ns: 'glossary' }),
      value: 'status',
      options: employeeStatusOptions,
    },
  ]

  // Mock table object for toolbar compatibility
  const mockTable = {
    getState: () => ({ columnFilters: [] }),
    getColumn: (id: string) => ({
      setFilterValue: (value: any) => {
        if (id === 'fullName') setSearchQuery(value || '')
        if (id === 'status')
          setStatusFilter(Array.isArray(value) ? value : value ? [value] : [])
        if (id === 'team')
          setTeamFilter(Array.isArray(value) ? value : value ? [value] : [])
      },
      getFilterValue: () => {
        if (id === 'fullName') return searchQuery
        if (id === 'status') return statusFilter
        if (id === 'team') return teamFilter
        return undefined
      },
    }),
    resetColumnFilters: () => {
      setSearchQuery('')
      setStatusFilter([])
      setTeamFilter([])
    },
  } as any

  return (
    <div className='space-y-4'>
      <DataTableToolbar table={mockTable} filterFields={filterFields}>
        <div className='flex items-center space-x-2'>
          <Checkbox
            checked={
              selectedEmployees.size === filteredEmployees.length &&
              filteredEmployees.length > 0
            }
            onCheckedChange={handleSelectAll}
          />
          <span className='text-sm text-gray-600'>
            {selectedEmployees.size} of {filteredEmployees.length} selected
          </span>
        </div>
      </DataTableToolbar>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {filteredEmployees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            isSelected={selectedEmployees.has(employee.id)}
            onSelect={(selected) => handleSelectEmployee(employee.id, selected)}
            onView={() => onEmployeeView?.(employee)}
            onEdit={() => onEmployeeEdit?.(employee)}
            onDelete={() => onEmployeeDelete?.(employee)}
            onInvite={() => onEmployeeInvite?.(employee)}
          />
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className='py-12 text-center'>
          <p className='text-gray-500'>
            No employees found matching your criteria.
          </p>
        </div>
      )}
    </div>
  )
}
