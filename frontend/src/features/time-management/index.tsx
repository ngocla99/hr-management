import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AttendanceLog } from './components/attendance/attendance-log'
import { AttendanceSummary } from './components/attendance/attendance-summary'
import { OvertimeList } from './components/overtime-list'
import { TimeOffList } from './components/time-off-list'

interface TimeManagementProps {
  employeeId: string
}

export function TimeManagement({ employeeId }: TimeManagementProps) {
  const { t } = useTranslation('time-management')

  return (
    <Tabs defaultValue='attendance' variant='pills' className='gap-0'>
      <div className='bg-accent m-0 flex items-center justify-between rounded-lg rounded-b-none p-4'>
        <TabsList>
          <TabsTrigger value='attendance'>{t('tabs.attendance')}</TabsTrigger>
          <TabsTrigger value='time-off'>{t('tabs.timeOff')}</TabsTrigger>
          <TabsTrigger value='overtime'>{t('tabs.overtime')}</TabsTrigger>
        </TabsList>
        <div className='flex items-center space-x-2'>
          <span className='font-bold'>26 Jan - 26 Feb 2023</span>
        </div>
        <div className='flex items-center'>
          <Button
            variant='outline'
            size='sm'
            className='size-8 rounded-r-none p-0'
          >
            <ChevronLeft className='size-4' />
          </Button>
          <Button
            variant='outline'
            size='sm'
            className='size-8 rounded-l-none p-0'
          >
            <ChevronRight className='size-4' />
          </Button>
          <Separator orientation='vertical' className='mx-4 h-6!' />
          <Button size='sm' variant='dark'>
            {t('actions.addAttendance')}
          </Button>
        </div>
      </div>

      <TabsContent value='attendance' className='space-y-6'>
        <AttendanceSummary employeeId={employeeId} className='rounded-t-none' />
        <AttendanceLog employeeId={employeeId} />
      </TabsContent>

      <TabsContent value='time-off'>
        <TimeOffList employeeId={employeeId} />
      </TabsContent>

      <TabsContent value='overtime'>
        <OvertimeList employeeId={employeeId} />
      </TabsContent>
    </Tabs>
  )
}
