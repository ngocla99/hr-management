import { useState } from 'react'
import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from '@tanstack/react-router'
import { IconPencilMinus } from '@tabler/icons-react'
import { Department, EmploymentType, JobLevel, JobRole } from '@/types/api'
import { Briefcase } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FormDatePicker } from '@/components/form-field/form-date-picker'
import { FormSelect } from '@/components/form-field/form-select'
import {
  employeeDepartmentOptionsFn,
  employeeRoleOptionsFn,
  employmentTypeOptionsFn,
  jobLevelOptionsFn,
} from '@/features/employee/constants/employee-options'
import { Employee } from '@/features/employee/type/employee'
import { useUpdateUser } from '@/features/user/api/update-user'

interface EmploymentOverviewProps {
  employee: Employee
}

const employmentOverviewSchema = z.object({
  hireDate: z.coerce.date().optional(),
  jobRole: z.nativeEnum(JobRole).optional(),
  jobLevel: z.nativeEnum(JobLevel).optional(),
  employmentType: z.nativeEnum(EmploymentType).optional(),
  department: z.nativeEnum(Department).optional(),
})

type EmploymentOverviewFormData = z.infer<typeof employmentOverviewSchema>

export function EmploymentOverview({ employee }: EmploymentOverviewProps) {
  const { t } = useTranslation()
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()

  const form = useForm<EmploymentOverviewFormData>({
    resolver: zodResolver(employmentOverviewSchema),
    defaultValues: {
      hireDate: employee.hireDate,
      jobRole: employee.jobRole,
      jobLevel: employee.jobLevel,
      employmentType: employee.employmentType,
      department: employee.department,
    },
  })

  const updateUserMutation = useUpdateUser({
    mutationConfig: {
      onSuccess: () => {
        router.invalidate()
        setIsEditing(false)
      },
    },
  })

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    form.reset()
  }

  const handleSave = async (data: EmploymentOverviewFormData) => {
    if (updateUserMutation.isPending) return
    updateUserMutation.mutate({
      id: employee.userId,
      ...data,
    })
  }

  const formatEmploymentDuration = (startDate: Date) => {
    const start = new Date(startDate)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - start.getTime())
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365))
    return `${start.getFullYear()}-Current (${diffYears} Years)`
  }

  const employmentFields = [
    {
      label: t('dateStarted', { ns: 'glossary' }),
      value: employee.hireDate
        ? formatEmploymentDuration(employee.hireDate)
        : '-',
      className: 'pt-0 pb-2',
    },
    {
      label: t('jobRole', { ns: 'glossary' }),
      value: employee.jobRole
        ? t(`role.${employee.jobRole}`, { ns: 'employee' })
        : '-',
      className: 'pt-0 pb-2 pl-4',
    },
    {
      label: t('jobLevel', { ns: 'glossary' }),
      value: employee.jobLevel
        ? t(`level.${employee.jobLevel}`, { ns: 'employee' })
        : '-',
      className: 'border-none pb-2',
    },
    {
      label: t('employmentStatus', { ns: 'glossary' }),
      value: employee.employmentType
        ? t(`employmentType.${employee.employmentType}`, { ns: 'employee' })
        : '-',
      className: 'border-none pb-2 pl-4',
    },
  ]

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0'>
        <CardTitle className='flex items-center space-x-2'>
          <Briefcase className='text-muted-foreground size-5' />
          <span className='font-bold'>
            {t('page.employmentOverview', { ns: 'employee' })}
          </span>
        </CardTitle>
        {!isEditing ? (
          <Button
            variant='light'
            size='sm'
            className='shadow-2xl'
            onClick={handleEdit}
          >
            <IconPencilMinus className='mr-2 h-4 w-4' />
            {t('edit', { ns: 'common' })}
          </Button>
        ) : (
          <div className='flex space-x-2'>
            <Button
              size='sm'
              onClick={form.handleSubmit(handleSave)}
              className='shadow-2xl'
            >
              {t('save', { ns: 'common' })}
            </Button>
            <Button
              variant='light'
              size='sm'
              onClick={handleCancel}
              className='shadow-2xl'
            >
              {t('cancel', { ns: 'common' })}
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {!isEditing ? (
          <>
            <div className='grid grid-cols-2'>
              {employmentFields.map((field, index) => (
                <div
                  key={index}
                  className={cn('col-span-1 border-b py-5', field.className)}
                >
                  <div className='grid gap-2'>
                    <label className='text-muted-foreground text-xs font-medium'>
                      {field.label}
                    </label>
                    <div className='text-foreground text-sm font-medium capitalize'>
                      {field.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className='pt-4'>
              <div className='group/button'>
                <Button
                  variant='link'
                  className='text-foreground hover:text-primary mr-1.5 h-auto p-0 text-xs'
                >
                  <span className='underline underline-offset-4'>
                    {t('viewContract', { ns: 'common' })}
                  </span>
                </Button>
                <span className='group-hover/button:text-primary text-sm'>
                  &gt;
                </span>
              </div>
            </div>
          </>
        ) : (
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(handleSave)}
              className='grid grid-cols-2 gap-4 pb-4'
            >
              <FormDatePicker
                name='hireDate'
                label={t('dateStarted', { ns: 'glossary' })}
                placeholder={t('form.selectStartDate', { ns: 'employee' })}
              />
              <FormSelect
                name='jobRole'
                label={t('jobRole', { ns: 'glossary' })}
                placeholder={t('form.selectJobRole', { ns: 'employee' })}
                items={employeeRoleOptionsFn(t)}
                classes={{ input: 'w-full' }}
              />
              <FormSelect
                name='jobLevel'
                label={t('jobLevel', { ns: 'glossary' })}
                placeholder={t('form.selectJobLevel', { ns: 'employee' })}
                items={jobLevelOptionsFn(t)}
                classes={{ input: 'w-full' }}
              />
              <FormSelect
                name='employmentType'
                label={t('employmentStatus', { ns: 'glossary' })}
                placeholder={t('form.selectEmploymentType', { ns: 'employee' })}
                items={employmentTypeOptionsFn(t)}
                classes={{ input: 'w-full' }}
              />
              <FormSelect
                name='department'
                label={t('department', { ns: 'glossary' })}
                placeholder={t('form.selectDepartment', { ns: 'employee' })}
                items={employeeDepartmentOptionsFn(t)}
                classes={{ input: 'w-full' }}
              />
            </form>
          </FormProvider>
        )}
      </CardContent>
    </Card>
  )
}
