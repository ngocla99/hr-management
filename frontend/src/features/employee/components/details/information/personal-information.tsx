import { useState } from 'react'
import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { IconPencilMinus, IconUserFilled } from '@tabler/icons-react'
import { BloodType, Gender, MaritalStatus, User } from '@/types/api'
import { useTranslation } from 'react-i18next'
import { formatDate } from '@/lib/date'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FormDatePicker } from '@/components/form-field/form-date-picker'
import { FormInput } from '@/components/form-field/form-input'
import { FormSelect } from '@/components/form-field/form-select'
import { getUserQueryOptions } from '@/features/user/api/get-user'
import { useUpdateUser } from '@/features/user/api/update-user'
import {
  bloodTypeOptionsFn,
  genderOptionsFn,
  maritalStatusOptionsFn,
} from '../../../constants/employee-options'

interface PersonalInformationProps {
  employee: User
}

const personalInformationSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  gender: z.nativeEnum(Gender).optional(),
  maritalStatus: z.nativeEnum(MaritalStatus).optional(),
  religion: z.string().optional(),
  placeOfBirth: z.string().optional(),
  dateOfBirth: z.coerce.date().optional(),
  bloodType: z.nativeEnum(BloodType).optional(),
})

type PersonalInformationFormData = z.infer<typeof personalInformationSchema>

export function PersonalInformation({ employee }: PersonalInformationProps) {
  const { t } = useTranslation()
  const [isEditing, setIsEditing] = useState(false)
  const queryClient = useQueryClient()

  const form = useForm<PersonalInformationFormData>({
    resolver: zodResolver(personalInformationSchema),
    defaultValues: {
      firstName: employee.firstName || '',
      lastName: employee.lastName || '',
      gender: employee.gender,
      maritalStatus: employee.maritalStatus,
      religion: employee.religion || '',
      placeOfBirth: employee.placeOfBirth || '',
      dateOfBirth: employee.dateOfBirth,
      bloodType: employee.bloodType,
    },
  })

  const updateUserMutation = useUpdateUser({
    mutationConfig: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getUserQueryOptions(employee.id).queryKey,
        })
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

  const handleSave = async (data: PersonalInformationFormData) => {
    if (updateUserMutation.isPending) return
    updateUserMutation.mutate({
      id: employee.id,
      ...data,
    })
  }

  const personalFields = [
    {
      label: t('fullName', { ns: 'glossary' }),
      value: employee.fullName,
      className: 'pt-0',
    },
    {
      label: t('gender', { ns: 'glossary' }),
      value: employee.gender
        ? t(`gender.${employee.gender}`, { ns: 'users' })
        : '-',
      className: 'pt-0 pl-4',
    },
    {
      label: t('maritalStatus', { ns: 'glossary' }),
      value: employee.maritalStatus
        ? t(`maritalStatus.${employee.maritalStatus}`, { ns: 'users' })
        : '-',
      className: '',
    },
    {
      label: t('religion', { ns: 'glossary' }),
      value: employee.religion || '-',
      className: 'pl-4',
    },
    {
      label: t('placeOfBirth', { ns: 'glossary' }),
      value: employee.placeOfBirth || '-',
      className: '',
    },
    {
      label: t('birthdate', { ns: 'glossary' }),
      value: employee.dateOfBirth ? formatDate(employee.dateOfBirth) : '-',
      className: 'pl-4',
    },
    {
      label: t('bloodType', { ns: 'glossary' }),
      value: employee.bloodType || '-',
      className: 'border-none pb-0',
    },
    {
      label: t('age', { ns: 'glossary' }),
      value: employee.dateOfBirth
        ? String(
            new Date().getFullYear() -
              new Date(employee.dateOfBirth).getFullYear()
          )
        : '-',
      className: 'border-none pb-0 pl-4',
    },
  ]

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0'>
        <CardTitle className='flex items-center space-x-2'>
          <IconUserFilled className='text-muted-foreground size-5' />
          <span className='font-bold'>
            {t('page.personalInformation', { ns: 'employee' })}
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
          <div className='grid grid-cols-2 pb-2'>
            {personalFields.map((field, index) => (
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
        ) : (
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(handleSave)}
              className='grid grid-cols-2 gap-4 pb-[11px]'
            >
              <FormInput
                name='firstName'
                label={t('firstName', { ns: 'glossary' })}
                placeholder={t('form.enterFirstName', { ns: 'employee' })}
                required
              />
              <FormInput
                name='lastName'
                label={t('lastName', { ns: 'glossary' })}
                placeholder={t('form.enterLastName', { ns: 'employee' })}
                required
              />
              <FormSelect
                name='gender'
                label={t('gender', { ns: 'glossary' })}
                placeholder={t('form.selectGender', { ns: 'employee' })}
                items={genderOptionsFn(t)}
                classes={{ input: 'w-full' }}
              />
              <FormSelect
                name='maritalStatus'
                label={t('maritalStatus', { ns: 'glossary' })}
                placeholder={t('form.selectMaritalStatus', { ns: 'employee' })}
                items={maritalStatusOptionsFn(t)}
                classes={{ input: 'w-full' }}
              />
              <FormInput
                name='religion'
                label={t('religion', { ns: 'glossary' })}
                placeholder={t('form.enterReligion', { ns: 'employee' })}
              />
              <FormInput
                name='placeOfBirth'
                label={t('placeOfBirth', { ns: 'glossary' })}
                placeholder={t('form.enterPlaceOfBirth', { ns: 'employee' })}
              />
              <FormDatePicker
                name='dateOfBirth'
                label={t('birthdate', { ns: 'glossary' })}
                placeholder={t('form.selectBirthdate', { ns: 'employee' })}
              />
              <FormSelect
                name='bloodType'
                label={t('bloodType', { ns: 'glossary' })}
                placeholder={t('form.selectBloodType', { ns: 'employee' })}
                items={bloodTypeOptionsFn(t)}
                classes={{ input: 'w-full' }}
              />
            </form>
          </FormProvider>
        )}
      </CardContent>
    </Card>
  )
}
