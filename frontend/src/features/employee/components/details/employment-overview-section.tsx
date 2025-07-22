import React from 'react'
import { User } from '@/types/api'
import { Edit, Briefcase, ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { formatDate } from '@/lib/date'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface EmploymentOverviewSectionProps {
  employee: User
}

export function EmploymentOverviewSection({
  employee,
}: EmploymentOverviewSectionProps) {
  const { t } = useTranslation()

  const formatEmploymentDuration = (startDate: Date) => {
    const start = new Date(startDate)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - start.getTime())
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365))
    return `${start.getFullYear()}-Current (${diffYears} Years)`
  }

  const employmentFields = [
    {
      label: 'Date Started',
      value: employee.dateStarted
        ? formatEmploymentDuration(employee.dateStarted)
        : '-',
    },
    {
      label: 'Job Role',
      value: employee.jobRole
        ? t(`role.${employee.jobRole}`, { ns: 'employee' })
        : '-',
    },
    {
      label: 'Job Level',
      value: employee.jobLevel
        ? t(`jobLevel.${employee.jobLevel}`, { ns: 'employee' })
        : '-',
    },
    {
      label: 'Employment Status',
      value: employee.employmentType
        ? t(`employmentType.${employee.employmentType}`, { ns: 'employee' })
        : '-',
    },
  ]

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-4'>
        <CardTitle className='flex items-center space-x-2'>
          <div className='rounded-lg bg-purple-100 p-2 dark:bg-purple-900'>
            <Briefcase className='h-4 w-4 text-purple-600 dark:text-purple-400' />
          </div>
          <span>Employment Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {employmentFields.map((field, index) => (
          <div key={index} className='flex items-center justify-between'>
            <label className='text-muted-foreground text-sm'>
              {field.label}
            </label>
            <div className='text-sm font-medium'>{field.value}</div>
          </div>
        ))}

        <div className='pt-2'>
          <Button variant='link' size='sm' className='h-auto p-0 text-sm'>
            View contract
            <ExternalLink className='ml-1 h-3 w-3' />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
