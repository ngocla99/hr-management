import { getRouteApi, useNavigate } from '@tanstack/react-router'
import { Route as EmployeeRouteId } from '@/routes/_authenticated/organization/employee/$employeeId'
import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Main } from '@/components/layout/main'
import { EmployeeDetailHeader } from '@/features/employee/components/details/employee-detail-header'
import { AddressInformation } from '@/features/employee/components/details/information/address-information'
import { ContactInformation } from '@/features/employee/components/details/information/contact-information'
import { EmploymentOverview } from '@/features/employee/components/details/information/employment-overview'
import { PersonalInformation } from '@/features/employee/components/details/information/personal-information'
import { Tags } from '@/features/employee/components/details/information/tags'
import { employeeTabsFn } from '@/features/employee/constants/employee-config'
import { TimeManagement } from '@/features/time-management'

const route = getRouteApi(EmployeeRouteId.id)
export function EmployeeDetailPage() {
  const search = route.useSearch()
  const tab = search?.tab || 'personal'
  const employee = route.useLoaderData()

  const { t } = useTranslation()
  const navigate = useNavigate()
  const tabs = employeeTabsFn(t)

  const handleTabChange = (value: string) => {
    navigate({
      search: (prev) => ({ ...prev, tab: value }),
      to: '.',
    })
  }

  return (
    <Main>
      <div className='space-y-6'>
        <EmployeeDetailHeader employee={employee} />

        <Tabs
          variant='underline'
          value={tab}
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
                  <Badge
                    variant='neutral'
                    className='h-5 rounded px-1.5 text-xs'
                  >
                    {tab.count}
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value='personal' className='space-y-6'>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
              <div className='space-y-6 lg:col-span-2'>
                <PersonalInformation employee={employee} />
                <AddressInformation employee={employee} />
              </div>

              <div className='space-y-6'>
                <ContactInformation employee={employee} />
                <EmploymentOverview employee={employee} />
                <Tags employee={employee} />
              </div>
            </div>
          </TabsContent>

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
            <TimeManagement employeeId={employee.id} />
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
    </Main>
  )
}
