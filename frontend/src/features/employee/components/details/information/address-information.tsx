import { useState } from 'react'
import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from '@tanstack/react-router'
import { IconMapPinFilled, IconPencilMinus } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { FormTextarea } from '@/components/form-field/form-textarea'
import { useUpdateEmployee } from '@/features/employee/api/update-employee'
import { Employee } from '@/features/employee/type/employee'

interface AddressInformationProps {
  employee: Employee
}

const addressInformationSchema = z.object({
  residentialAddress: z.string().optional(),
  residentialAddressNotes: z.string().optional(),
  citizenIdAddress: z.string().optional(),
  citizenIdAddressNotes: z.string().optional(),
})

type AddressInformationFormData = z.infer<typeof addressInformationSchema>

export function AddressInformation({ employee }: AddressInformationProps) {
  const { t } = useTranslation()
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()

  const form = useForm<AddressInformationFormData>({
    resolver: zodResolver(addressInformationSchema),
    defaultValues: {
      residentialAddress: employee.residentialAddress || '',
      residentialAddressNotes: employee.residentialAddressNotes || '',
      citizenIdAddress: employee.citizenIdAddress || '',
      citizenIdAddressNotes: employee.citizenIdAddressNotes || '',
    },
  })

  const updateEmployeeMutation = useUpdateEmployee({
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

  const handleSave = async (data: AddressInformationFormData) => {
    if (updateEmployeeMutation.isPending) return
    updateEmployeeMutation.mutate({
      id: employee.id,
      ...data,
    })
  }

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0'>
        <CardTitle className='flex items-center space-x-2'>
          <IconMapPinFilled className='text-muted-foreground size-5' />
          <span className='font-bold'>
            {t('page.addressInformation', { ns: 'employee' })}
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
      <CardContent className='space-y-6'>
        {!isEditing ? (
          <>
            <div className='mb-3 flex items-center justify-between'>
              <label className='text-muted-foreground text-xs font-medium'>
                {t('page.residentialAddress', { ns: 'employee' })}
              </label>
              <div className='group/button'>
                <Button
                  variant='link'
                  className='text-foreground hover:text-primary mr-1.5 h-auto p-0 text-xs'
                >
                  <span className='underline underline-offset-4'>
                    {t('viewOnMap', { ns: 'common' })}
                  </span>
                </Button>
                <span className='group-hover/button:text-primary text-sm'>
                  &gt;
                </span>
              </div>
            </div>
            <div className='mb-2 text-sm font-medium'>
              {employee.residentialAddress ||
                t('notProvided', { ns: 'glossary' })}
            </div>
            {employee.residentialAddressNotes && (
              <div>
                <label className='text-muted-foreground text-xs'>
                  {t('page.notes', { ns: 'employee' })}
                </label>
                <div className='mt-1 text-sm'>
                  {employee.residentialAddressNotes}
                </div>
              </div>
            )}

            <Separator />

            <div className='mb-3 flex items-center justify-between'>
              <label className='text-muted-foreground text-xs font-medium'>
                {t('page.citizenIdAddress', { ns: 'employee' })}
              </label>
              <div className='group/button'>
                <Button
                  variant='link'
                  className='text-foreground hover:text-primary mr-1.5 h-auto p-0 text-xs'
                >
                  <span className='underline underline-offset-4'>
                    {t('viewOnMap', { ns: 'common' })}
                  </span>
                </Button>
                <span className='group-hover/button:text-primary text-sm'>
                  &gt;
                </span>
              </div>
            </div>
            <div className='mb-2 text-sm font-medium'>
              {employee.citizenIdAddress ||
                t('notProvided', { ns: 'glossary' })}
            </div>
            {employee.citizenIdAddressNotes && (
              <div>
                <label className='text-muted-foreground text-xs'>
                  {t('page.notes', { ns: 'employee' })}
                </label>
                <div className='bg-muted/50 mt-1 w-60/100 rounded-md p-3 text-sm'>
                  {employee.citizenIdAddressNotes}
                </div>
              </div>
            )}
          </>
        ) : (
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(handleSave)}
              className='space-y-6'
            >
              {/* Residential Address */}
              <div>
                <div className='mb-3 flex items-center justify-between'>
                  <label className='text-muted-foreground text-xs font-medium'>
                    {t('page.residentialAddress', { ns: 'employee' })}
                  </label>
                  <div className='group/button'>
                    <Button
                      variant='link'
                      className='text-foreground hover:text-primary mr-1.5 h-auto p-0 text-xs'
                    >
                      <span className='underline underline-offset-4'>
                        {t('viewOnMap', { ns: 'common' })}
                      </span>
                    </Button>
                    <span className='group-hover/button:text-primary text-sm'>
                      &gt;
                    </span>
                  </div>
                </div>
                <FormTextarea
                  name='residentialAddress'
                  placeholder={t('form.enterResidentialAddress', {
                    ns: 'employee',
                  })}
                  className='mb-3'
                />
                <FormTextarea
                  name='residentialAddressNotes'
                  label={t('page.notes', { ns: 'employee' })}
                  placeholder={t('form.enterNotes', { ns: 'employee' })}
                />
              </div>

              <Separator />

              {/* Citizen ID Address */}
              <div>
                <div className='mb-3 flex items-center justify-between'>
                  <label className='text-muted-foreground text-xs font-medium'>
                    {t('page.citizenIdAddress', { ns: 'employee' })}
                  </label>
                  <div className='group/button'>
                    <Button
                      variant='link'
                      className='text-foreground hover:text-primary mr-1.5 h-auto p-0 text-xs'
                    >
                      <span className='underline underline-offset-4'>
                        {t('viewOnMap', { ns: 'common' })}
                      </span>
                    </Button>
                    <span className='group-hover/button:text-primary text-sm'>
                      &gt;
                    </span>
                  </div>
                </div>
                <FormTextarea
                  name='citizenIdAddress'
                  placeholder={t('form.enterCitizenIdAddress', {
                    ns: 'employee',
                  })}
                  className='mb-3'
                />
                <FormTextarea
                  name='citizenIdAddressNotes'
                  label={t('page.notes', { ns: 'employee' })}
                  placeholder={t('form.enterNotes', { ns: 'employee' })}
                />
              </div>
            </form>
          </FormProvider>
        )}
      </CardContent>
    </Card>
  )
}
