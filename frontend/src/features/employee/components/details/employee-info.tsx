import { useNavigate } from '@tanstack/react-router'
import { User } from '@/types/api'
import {
  User as UserIcon,
  FileText as FileTextIcon,
  Coins as CoinsIcon,
  Clock as ClockIcon,
  BarChart3 as BarChartIcon,
  FileSpreadsheet as FileSpreadsheetIcon,
  BookOpen as BookOpenIcon,
  Wallet as WalletIcon,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AddressInformation } from './address-information.tsx'
import { ContactInformation } from './contact-information.tsx'
import { EmployeeDetailHeader } from './employee-detail-header'
import { EmploymentOverviewSection } from './employment-overview-section.tsx'
import { PersonalInformation } from './personal-information.tsx'
import { TagsSection } from './tags-section.tsx'

interface EmployeeInfoProps {
  employee: User
  defaultTab?: string
  onPrevious?: () => void
  onNext?: () => void
  currentIndex?: number
  totalCount?: number
}

export function EmployeeInfo({
  employee,
  defaultTab = 'personal',
  onPrevious,
  onNext,
  currentIndex = 1,
  totalCount = 32,
}: EmployeeInfoProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const tabs = [
    { value: 'personal', label: 'Personal Information', icon: UserIcon },
    { value: 'contract', label: 'Contract', icon: FileTextIcon },
    { value: 'payroll', label: 'Payroll', icon: CoinsIcon },
    { value: 'time', label: 'Time Management', icon: ClockIcon },
    { value: 'assets', label: 'Assets', icon: BarChartIcon, count: 3 },
    {
      value: 'document',
      label: 'Document',
      icon: FileSpreadsheetIcon,
      count: 6,
    },
    { value: 'training', label: 'Training', icon: BookOpenIcon },
    { value: 'finance', label: 'Finance', icon: WalletIcon },
  ]

  const handleTabChange = (value: string) => {
    navigate({
      search: (prev) => ({ ...prev, tab: value }),
      to: '.',
    })
  }

  return (
    <div className='space-y-6'>
      <EmployeeDetailHeader
        employee={employee}
        onPrevious={onPrevious}
        onNext={onNext}
        currentIndex={currentIndex}
        totalCount={totalCount}
      />

      {/* Tabs */}
      <Tabs
        variant='underline'
        value={defaultTab}
        onValueChange={handleTabChange}
        className='space-y-6'
      >
        <TabsList className='justify-start'>
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className='flex items-center space-x-2 px-4 py-2'
            >
              <tab.icon className='h-4 w-4' />
              <span>{tab.label}</span>
              {tab.count && (
                <Badge variant='neutral' className='h-5 rounded px-1.5 text-xs'>
                  {tab.count}
                </Badge>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value='personal' className='space-y-6'>
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
            <div className='space-y-6 lg:col-span-2'>
              <PersonalInformation employee={employee} />
              <AddressInformation employee={employee} />
            </div>

            <div className='space-y-6'>
              <ContactInformation employee={employee} />
              <EmploymentOverviewSection employee={employee} />
              <TagsSection employee={employee} />
            </div>
          </div>
        </TabsContent>

        {/* Placeholder tabs for other sections */}
        <TabsContent value='contract'>
          <Card>
            <CardHeader>
              <CardTitle>Contract Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                Contract details will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='payroll'>
          <Card>
            <CardHeader>
              <CardTitle>Payroll Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                Payroll details will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='time'>
          <Card>
            <CardHeader>
              <CardTitle>Time Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                Time tracking details will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='assets'>
          <Card>
            <CardHeader>
              <CardTitle>Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                Employee assets will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='document'>
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                Employee documents will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='training'>
          <Card>
            <CardHeader>
              <CardTitle>Training</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                Training records will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='finance'>
          <Card>
            <CardHeader>
              <CardTitle>Finance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>
                Financial information will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
