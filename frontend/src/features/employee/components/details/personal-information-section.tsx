import React from 'react'
import { Edit } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { User } from '@/types/api'
import { formatDate } from '@/lib/date'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface PersonalInformationSectionProps {
  employee: User
}

export function PersonalInformationSection({ employee }: PersonalInformationSectionProps) {
  const { t } = useTranslation()

  const personalFields = [
    {
      label: t('fullName', { ns: 'glossary' }),
      value: employee.fullName,
      span: 'col-span-1'
    },
    {
      label: t('gender', { ns: 'glossary' }),
      value: employee.gender ? t(`gender.${employee.gender}`, { ns: 'common' }) : '-',
      span: 'col-span-1'
    },
    {
      label: t('maritalStatus', { ns: 'glossary' }),
      value: employee.maritalStatus ? t(`maritalStatus.${employee.maritalStatus}`, { ns: 'common' }) : '-',
      span: 'col-span-1'
    },
    {
      label: t('religion', { ns: 'glossary' }),
      value: employee.religion || '-',
      span: 'col-span-1'
    },
    {
      label: t('placeOfBirth', { ns: 'glossary' }),
      value: employee.placeOfBirth || '-',
      span: 'col-span-1'
    },
    {
      label: t('birthdate', { ns: 'glossary' }),
      value: employee.dateOfBirth ? formatDate(employee.dateOfBirth, { dateStyle: 'medium' }) : '-',
      span: 'col-span-1'
    },
    {
      label: t('bloodType', { ns: 'glossary' }),
      value: employee.bloodType || '-',
      span: 'col-span-1'
    },
    {
      label: t('age', { ns: 'glossary' }),
      value: employee.dateOfBirth 
        ? String(new Date().getFullYear() - new Date(employee.dateOfBirth).getFullYear())
        : '-',
      span: 'col-span-1'
    }
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center space-x-2">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <span>Personal Information</span>
        </CardTitle>
        <Button variant="ghost" size="sm">
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          {personalFields.map((field, index) => (
            <div key={index} className={field.span}>
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">
                  {field.label}
                </label>
                <div className="text-sm font-medium">
                  {field.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 