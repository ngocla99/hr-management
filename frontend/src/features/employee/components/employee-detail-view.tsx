import {
  IconMail,
  IconPhone,
  IconMapPin,
  IconEdit,
  IconTrash,
  IconX,
  IconCalendar,
  IconUser,
  IconBriefcase,
} from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { employeeStatusStyles } from '../constants/employee-options'
import { Employee } from '../types/employee.types'

interface EmployeeDetailViewProps {
  employee: Employee | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onEdit?: (employee: Employee) => void
  onDelete?: (employee: Employee) => void
}

export function EmployeeDetailView({
  employee,
  open,
  onOpenChange,
  onEdit,
  onDelete,
}: EmployeeDetailViewProps) {
  const { t } = useTranslation()

  if (!employee) return null

  const badgeColor = employeeStatusStyles.get(employee.status)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side='right'
        className='w-full sm:w-[480px] sm:max-w-[480px]'
      >
        <SheetHeader className='space-y-4'>
          <div className='flex items-center justify-between'>
            <SheetTitle className='text-lg font-semibold'>
              Employee Details
            </SheetTitle>
            <div className='flex items-center space-x-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => onEdit?.(employee)}
              >
                <IconEdit className='mr-2 h-4 w-4' />
                {t('edit', { ns: 'common' })}
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() => onDelete?.(employee)}
                className='text-red-600 hover:text-red-700'
              >
                <IconTrash className='mr-2 h-4 w-4' />
                {t('delete', { ns: 'common' })}
              </Button>
            </div>
          </div>

          {/* Employee Header */}
          <div className='flex items-center space-x-4'>
            <Avatar className='h-16 w-16'>
              <AvatarImage src={employee.avatar} alt={employee.fullName} />
              <AvatarFallback className='text-lg'>
                {employee.firstName.charAt(0)}
                {employee.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className='min-w-0 flex-1'>
              <h2 className='text-xl font-semibold text-gray-900'>
                {employee.fullName}
              </h2>
              <p className='text-sm text-gray-600'>{employee.jobTitle}</p>
              <div className='mt-2 flex items-center space-x-2'>
                <Badge
                  variant='outline'
                  className={cn('capitalize', badgeColor)}
                >
                  {t(('status.' + employee.status.replace('_', '')) as any, {
                    ns: 'glossary',
                  })}
                </Badge>
                <span className='text-xs text-gray-500'>•</span>
                <span className='text-sm text-gray-600'>
                  {employee.department}
                </span>
              </div>
            </div>
          </div>
        </SheetHeader>

        <Separator className='my-6' />

        <Tabs defaultValue='details' className='space-y-4'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='details'>Details</TabsTrigger>
            <TabsTrigger value='payroll'>Payroll</TabsTrigger>
          </TabsList>

          <TabsContent value='details' className='space-y-6'>
            {/* Personal Information */}
            <div>
              <h3 className='mb-4 flex items-center text-lg font-medium'>
                <IconUser className='mr-2 h-5 w-5' />
                Personal Information
              </h3>
              <div className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='text-sm font-medium text-gray-700'>
                      Full Name
                    </label>
                    <p className='mt-1 text-sm text-gray-900'>
                      {employee.fullName}
                    </p>
                  </div>
                  <div>
                    <label className='text-sm font-medium text-gray-700'>
                      Gender
                    </label>
                    <p className='mt-1 text-sm text-gray-900 capitalize'>
                      {employee.gender}
                    </p>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='text-sm font-medium text-gray-700'>
                      Education
                    </label>
                    <p className='mt-1 text-sm text-gray-900'>
                      {employee.education}
                    </p>
                  </div>
                  <div>
                    <label className='text-sm font-medium text-gray-700'>
                      Marital Status
                    </label>
                    <p className='mt-1 text-sm text-gray-900 capitalize'>
                      {employee.maritalStatus}
                    </p>
                  </div>
                </div>

                <div>
                  <label className='flex items-center text-sm font-medium text-gray-700'>
                    <IconMapPin className='mr-1 h-4 w-4' />
                    Address
                  </label>
                  <p className='mt-1 text-sm text-gray-900'>
                    {employee.address}
                  </p>
                </div>

                <div>
                  <label className='flex items-center text-sm font-medium text-gray-700'>
                    <IconPhone className='mr-1 h-4 w-4' />
                    Emergency Contact
                  </label>
                  <p className='mt-1 text-sm text-gray-900'>
                    {employee.emergencyContact}
                  </p>
                </div>

                <div>
                  <label className='text-sm font-medium text-gray-700'>
                    Languages Spoken
                  </label>
                  <div className='mt-2 flex flex-wrap gap-2'>
                    {employee.languages.map((language) => (
                      <Badge
                        key={language}
                        variant='secondary'
                        className='text-xs'
                      >
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Professional Information */}
            <div>
              <h3 className='mb-4 flex items-center text-lg font-medium'>
                <IconBriefcase className='mr-2 h-5 w-5' />
                Professional Information
              </h3>
              <div className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='text-sm font-medium text-gray-700'>
                      Employee ID
                    </label>
                    <p className='mt-1 text-sm text-gray-900'>
                      {employee.employeeId}
                    </p>
                  </div>
                  <div>
                    <label className='text-sm font-medium text-gray-700'>
                      Job Title
                    </label>
                    <p className='mt-1 text-sm text-gray-900'>
                      {employee.jobTitle}
                    </p>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='text-sm font-medium text-gray-700'>
                      Employment Type
                    </label>
                    <p className='mt-1 text-sm text-gray-900 capitalize'>
                      {employee.employmentType}
                    </p>
                  </div>
                  <div>
                    <label className='text-sm font-medium text-gray-700'>
                      Department
                    </label>
                    <p className='mt-1 text-sm text-gray-900'>
                      {employee.department}
                    </p>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='text-sm font-medium text-gray-700'>
                      Team
                    </label>
                    <p className='mt-1 text-sm text-gray-900'>
                      {employee.team}
                    </p>
                  </div>
                  <div>
                    <label className='flex items-center text-sm font-medium text-gray-700'>
                      <IconCalendar className='mr-1 h-4 w-4' />
                      Date Joined
                    </label>
                    <p className='mt-1 text-sm text-gray-900'>
                      {employee.dateJoined}
                    </p>
                  </div>
                </div>

                <div>
                  <label className='text-sm font-medium text-gray-700'>
                    Status
                  </label>
                  <div className='mt-2'>
                    <Badge
                      variant='outline'
                      className={cn('capitalize', badgeColor)}
                    >
                      {t(
                        ('status.' + employee.status.replace('_', '')) as any,
                        {
                          ns: 'glossary',
                        }
                      )}
                    </Badge>
                  </div>
                </div>

                <div>
                  <label className='text-sm font-medium text-gray-700'>
                    Skills
                  </label>
                  <div className='mt-2 flex flex-wrap gap-2'>
                    {employee.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant='secondary'
                        className='text-xs'
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Contact Information */}
            <div>
              <h3 className='mb-4 text-lg font-medium'>Contact Information</h3>
              <div className='space-y-3'>
                <div className='flex items-center space-x-3'>
                  <IconMail className='h-5 w-5 text-gray-400' />
                  <div>
                    <p className='text-sm text-gray-900'>{employee.email}</p>
                    <p className='text-xs text-gray-500'>Work Email</p>
                  </div>
                </div>
                <div className='flex items-center space-x-3'>
                  <IconPhone className='h-5 w-5 text-gray-400' />
                  <div>
                    <p className='text-sm text-gray-900'>{employee.phone}</p>
                    <p className='text-xs text-gray-500'>Work Phone</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value='payroll' className='space-y-6'>
            <div className='py-12 text-center'>
              <IconBriefcase className='mx-auto h-12 w-12 text-gray-400' />
              <h3 className='mt-4 text-lg font-medium text-gray-900'>
                Payroll Information
              </h3>
              <p className='mt-2 text-sm text-gray-500'>
                Payroll details are not available in this demo.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
