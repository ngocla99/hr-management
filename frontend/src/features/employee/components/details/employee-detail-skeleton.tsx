import { Separator } from 'react-aria-components'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Main } from '@/components/layout/main'
import { employeeTabsFn } from '@/features/employee/constants/employee-config'

export function EmployeeDetailSkeleton() {
  const { t } = useTranslation()
  const tabs = employeeTabsFn(t)

  return (
    <Main>
      <div className='space-y-6'>
        {/* Header Skeleton */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <Skeleton className='h-10 w-10 rounded-full' />
            <Skeleton className='h-16 w-16 rounded-full' />
            <div className='flex items-center'>
              <div className='flex flex-col gap-2'>
                <Skeleton className='h-6 w-32' />
                <Skeleton className='h-5 w-16' />
              </div>
              <div className='bg-border mx-8 h-10 w-px' />
              <div className='flex items-center space-x-6'>
                {[1, 2, 3].map((i) => (
                  <div key={i} className='flex flex-col gap-2'>
                    <Skeleton className='h-4 w-20' />
                    <Skeleton className='h-4 w-24' />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='flex items-center space-x-3'>
            <div className='flex items-center space-x-2'>
              <Skeleton className='h-8 w-8 rounded-full' />
              <Skeleton className='h-8 w-8 rounded-full' />
              <Skeleton className='h-4 w-16' />
            </div>
            <Skeleton className='h-8 w-8' />
            <div className='bg-border h-4 w-px' />
            <Skeleton className='h-9 w-24' />
          </div>
        </div>

        {/* Tabs Skeleton */}
        <Tabs variant='underline' value='personal' className='space-y-6'>
          <TabsList className='justify-start'>
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className='flex items-center space-x-2 px-4 py-2'
                disabled
              >
                <tab.icon className='h-4 w-4' />
                <span>{tab.label}</span>
                {tab.count && (
                  <div className='bg-muted flex h-5 items-center rounded px-1.5 text-xs'>
                    {tab.count}
                  </div>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value='personal' className='space-y-6'>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
              {/* Left Column - Main Content */}
              <div className='space-y-6 lg:col-span-2'>
                {/* Personal Information Card */}
                <Card>
                  <CardHeader>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center space-x-2'>
                        <Skeleton className='h-5 w-5' />
                        <Skeleton className='h-6 w-40' />
                      </div>
                      <Skeleton className='h-8 w-16' />
                    </div>
                  </CardHeader>
                  <CardContent className='space-y-6'>
                    {/* Basic Information Section */}
                    <div>
                      <Skeleton className='mb-3 h-4 w-28' />
                      <div className='grid grid-cols-2 gap-4'>
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className='space-y-2'>
                            <Skeleton className='h-4 w-20' />
                            <Skeleton className='h-9 w-full' />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className='bg-border h-px w-full' />

                    {/* Additional Information Section */}
                    <div>
                      <Skeleton className='mb-3 h-4 w-32' />
                      <div className='grid grid-cols-2 gap-4'>
                        {[1, 2].map((i) => (
                          <div key={i} className='space-y-2'>
                            <Skeleton className='h-4 w-24' />
                            <Skeleton className='h-9 w-full' />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Address Information Card */}
                <Card>
                  <CardHeader>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center space-x-2'>
                        <Skeleton className='h-5 w-5' />
                        <Skeleton className='h-6 w-36' />
                      </div>
                      <Skeleton className='h-8 w-16' />
                    </div>
                  </CardHeader>
                  <CardContent className='space-y-6'>
                    {/* Current Address Section */}
                    <div>
                      <Skeleton className='mb-3 h-4 w-26' />
                      <div className='grid grid-cols-2 gap-4'>
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className='space-y-2'>
                            <Skeleton className='h-4 w-24' />
                            <Skeleton className='h-9 w-full' />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className='bg-border h-px w-full' />

                    {/* Permanent Address Section */}
                    <div>
                      <Skeleton className='mb-3 h-4 w-30' />
                      <div className='grid grid-cols-2 gap-4'>
                        {[1, 2].map((i) => (
                          <div key={i} className='space-y-2'>
                            <Skeleton className='h-4 w-28' />
                            <Skeleton className='h-9 w-full' />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Sidebar */}
              <div className='space-y-6'>
                {/* Contact Information Card */}
                <Card>
                  <CardHeader>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center space-x-2'>
                        <Skeleton className='h-5 w-5' />
                        <Skeleton className='h-6 w-32' />
                      </div>
                      <Skeleton className='h-8 w-16' />
                    </div>
                  </CardHeader>
                  <CardContent className='space-y-6'>
                    {/* Personal Contact Section */}
                    <div>
                      <Skeleton className='mb-3 h-4 w-24' />
                      <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                          <Skeleton className='h-3 w-16' />
                          <Skeleton className='h-6 w-20 rounded-full' />
                        </div>
                        <div className='space-y-2'>
                          <Skeleton className='h-3 w-12' />
                          <Skeleton className='h-6 w-24 rounded-full' />
                        </div>
                      </div>
                    </div>

                    <div className='bg-border h-px w-full' />

                    {/* Emergency Contact Section */}
                    <div>
                      <Skeleton className='mb-3 h-4 w-20' />
                      <div className='grid grid-cols-3 gap-4'>
                        <div className='space-y-2'>
                          <Skeleton className='h-3 w-20' />
                          <Skeleton className='h-4 w-16' />
                        </div>
                        <div className='space-y-2'>
                          <Skeleton className='h-3 w-18' />
                          <Skeleton className='h-4 w-20' />
                        </div>
                        <div className='space-y-2'>
                          <Skeleton className='h-3 w-16' />
                          <Skeleton className='h-4 w-14' />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Employment Overview Card */}
                <Card>
                  <CardHeader>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center space-x-2'>
                        <Skeleton className='h-5 w-5' />
                        <Skeleton className='h-6 w-36' />
                      </div>
                      <Skeleton className='h-8 w-16' />
                    </div>
                  </CardHeader>
                  <CardContent className='space-y-6'>
                    {/* Employment Details Section */}
                    <div>
                      <Skeleton className='mb-3 h-4 w-28' />
                      <div className='space-y-4'>
                        <div className='flex justify-between'>
                          <Skeleton className='h-4 w-20' />
                          <Skeleton className='h-4 w-32' />
                        </div>
                        <div className='flex justify-between'>
                          <Skeleton className='h-4 w-16' />
                          <Skeleton className='h-4 w-24' />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Job Details Section */}
                    <div>
                      <Skeleton className='mb-3 h-4 w-20' />
                      <div className='space-y-4'>
                        <div className='flex justify-between'>
                          <Skeleton className='h-4 w-18' />
                          <Skeleton className='h-4 w-28' />
                        </div>
                        <div className='flex justify-between'>
                          <Skeleton className='h-4 w-22' />
                          <Skeleton className='h-4 w-20' />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tags Card */}
                <Card>
                  <CardHeader>
                    <div className='flex items-center justify-between'>
                      <Skeleton className='h-6 w-16' />
                      <Skeleton className='h-8 w-8 rounded-full' />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className='flex flex-wrap gap-2'>
                      {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className='h-6 w-16 rounded-full' />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Other tab contents - just show placeholder cards */}
          {tabs.slice(1).map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <Card>
                <CardHeader>
                  <Skeleton className='h-6 w-40' />
                </CardHeader>
                <CardContent>
                  <Skeleton className='h-4 w-64' />
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Main>
  )
}
