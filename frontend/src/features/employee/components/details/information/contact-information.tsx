import { useState } from 'react'
import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from '@tanstack/react-router'
import { IconAddressBook, IconPencilMinus } from '@tabler/icons-react'
import { User } from '@/types/api'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { FormInput } from '@/components/form-field/form-input'
import { useUpdateUser } from '@/features/user/api/update-user'

interface ContactInformationProps {
  employee: User
}

const contactInformationSchema = z.object({
  phoneNumber: z.string().optional(),
  email: z.string().email('invalidEmail').optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  emergencyContactRelationship: z.string().optional(),
})

type ContactInformationFormData = z.infer<typeof contactInformationSchema>

export function ContactInformation({ employee }: ContactInformationProps) {
  const { t } = useTranslation()
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()

  const form = useForm<ContactInformationFormData>({
    resolver: zodResolver(contactInformationSchema),
    defaultValues: {
      phoneNumber: employee.phoneNumber || '',
      email: employee.email || '',
      emergencyContactName: employee.emergencyContactName || '',
      emergencyContactPhone: employee.emergencyContactPhone || '',
      emergencyContactRelationship: employee.emergencyContactRelationship || '',
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

  const handleSave = async (data: ContactInformationFormData) => {
    if (updateUserMutation.isPending) return
    updateUserMutation.mutate({
      id: employee.id,
      ...data,
    })
  }

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0'>
        <CardTitle className='flex items-center space-x-2'>
          <IconAddressBook className='text-muted-foreground size-5' />
          <span className='font-bold'>
            {t('page.contactInformation', { ns: 'employee' })}
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
      <CardContent className='space-y-6 pb-2'>
        {!isEditing ? (
          <>
            {/* Personal Contact */}
            <div>
              <h4 className='mb-3 text-sm font-medium'>
                {t('page.personalContact', { ns: 'employee' })}
              </h4>
              <div className='grid grid-cols-2 gap-4'>
                <div className='flex flex-col gap-2'>
                  <label className='text-muted-foreground text-xs'>
                    {t('phoneNumber', { ns: 'glossary' })}
                  </label>
                  {employee.phoneNumber ? (
                    <div className='text-chart-4 w-fit rounded-full border bg-white px-2 py-0.5 text-sm'>
                      {employee.phoneNumber}
                    </div>
                  ) : (
                    <>{t('notProvided', { ns: 'glossary' })}</>
                  )}
                </div>
                <div className='flex flex-col gap-2'>
                  <label className='text-muted-foreground text-xs'>
                    {t('email', { ns: 'glossary' })}
                  </label>
                  {employee.email ? (
                    <div className='text-chart-4 w-fit rounded-full border bg-white px-2 py-0.5 text-sm'>
                      {employee.email}
                    </div>
                  ) : (
                    <>{t('notProvided', { ns: 'glossary' })}</>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Emergency Contact */}
            <div>
              <h4 className='mb-3 text-sm font-medium'>
                {t('page.otherContact', { ns: 'employee' })}
              </h4>
              <div className='grid grid-cols-3 gap-4'>
                <div className='flex flex-col gap-2'>
                  <label className='text-muted-foreground text-xs'>
                    {t('emergencyContact', { ns: 'glossary' })}
                  </label>
                  <div className='text-sm'>
                    {employee.emergencyContactName ||
                      t('notProvided', { ns: 'glossary' })}
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <label className='text-muted-foreground text-xs'>
                    {t('emergencyPhone', { ns: 'glossary' })}
                  </label>
                  <div className='text-sm'>
                    {employee.emergencyContactPhone ||
                      t('notProvided', { ns: 'glossary' })}
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <label className='text-muted-foreground text-xs'>
                    {t('relationship', { ns: 'glossary' })}
                  </label>
                  <div className='text-sm'>
                    {employee.emergencyContactRelationship ||
                      t('notProvided', { ns: 'glossary' })}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(handleSave)}
              className='mt-6.5 space-y-6'
            >
              <div>
                <div className='grid grid-cols-2 gap-4'>
                  <FormInput
                    name='phoneNumber'
                    label={t('phoneNumber', { ns: 'glossary' })}
                    placeholder={t('form.enterPhoneNumber', { ns: 'employee' })}
                  />
                  <FormInput
                    name='email'
                    label={t('email', { ns: 'glossary' })}
                    placeholder={t('form.enterEmail', { ns: 'employee' })}
                    type='email'
                    disabled
                  />
                </div>
              </div>

              <Separator />

              <div>
                <div className='grid grid-cols-3 gap-4'>
                  <FormInput
                    name='emergencyContactName'
                    label={t('emergencyContact', { ns: 'glossary' })}
                    placeholder={t('form.enterEmergencyContact', {
                      ns: 'employee',
                    })}
                  />
                  <FormInput
                    name='emergencyContactPhone'
                    label={t('emergencyPhone', { ns: 'glossary' })}
                    placeholder={t('form.enterEmergencyPhone', {
                      ns: 'employee',
                    })}
                  />
                  <FormInput
                    name='emergencyContactRelationship'
                    label={t('relationship', { ns: 'glossary' })}
                    placeholder={t('form.enterRelationship', {
                      ns: 'employee',
                    })}
                  />
                </div>
              </div>
            </form>
          </FormProvider>
        )}
      </CardContent>
    </Card>
  )
}
