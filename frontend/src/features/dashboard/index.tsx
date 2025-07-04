import { useSuspenseQuery } from '@tanstack/react-query'
import { MoreHorizontal } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { getDashboardOverview } from '@/api/services/dashboard'
import { useUser } from '@/stores/auth-store'
import { QUERY_KEYS } from '@/lib/constants/constant'
import { DashboardOverviewSchema } from '@/lib/validations/dashboard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Main } from '@/components/layout/main'
import { DashboardChart } from './components/dashboard-chart'
import { DashboardStats } from './components/dashboard-stats'
import { EmployeeItem } from './components/employee-item'
import { IntegrateApp } from './components/integrate-app'
import { ProjectItem } from './components/project-item'
import { TOP_EMPLOYEES } from './data/dashboard'

export default function DashboardPage() {
  const { t } = useTranslation(['dashboard', 'common'])
  const user = useUser()

  // const { data } = useSuspenseQuery({
  //   queryKey: [QUERY_KEYS.DASHBOARD],
  //   queryFn: getDashboardOverview,
  //   select: (data) => DashboardOverviewSchema.parse(data),
  // })
  const data = {
    recentProjects: [],
    recentTasks: [],
    totalUsers: 0,
    totalProjects: 0,
    totalTasks: 0,
    tasksByStatus: [],
  }

  return (
    <Main className='grid gap-5'>
      {/* Header */}
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>
            {t('welcome', { name: user?.name })}
          </h1>
          <p className='text-muted-foreground'>{t('description')}</p>
        </div>
        <div className='flex items-center gap-2'>
          <Select defaultValue='this-month' disabled>
            <SelectTrigger className='w-[180px] bg-white'>
              <SelectValue placeholder={t('thisMonth', { ns: 'common' })} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='this-week'>
                {t('thisWeek', { ns: 'common' })}
              </SelectItem>
              <SelectItem value='this-month'>
                {t('thisMonth', { ns: 'common' })}
              </SelectItem>
              <SelectItem value='this-year'>
                {t('thisYear', { ns: 'common' })}
              </SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant='default'
            className='bg-black text-white hover:bg-gray-800'
          >
            {t('allTime', { ns: 'common' })}
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <DashboardStats data={data} />

      {/* Charts and Tables */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        {/* Task Completion Overview Chart */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-base font-medium'>
              {t('chart.taskCompletionOverview')}
            </CardTitle>
            <Select defaultValue='7days' disabled>
              <SelectTrigger className='h-8 w-[130px]'>
                <SelectValue placeholder={t('last7days', { ns: 'common' })} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='7days'>
                  {t('last7days', { ns: 'common' })}
                </SelectItem>
                <SelectItem value='30days'>
                  {t('last30days', { ns: 'common' })}
                </SelectItem>
                <SelectItem value='90days'>
                  {t('last90days', { ns: 'common' })}
                </SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className='pt-0'>
            <div className='h-[300px]'>
              <DashboardChart />
            </div>
          </CardContent>
        </Card>

        {/* Active Projects */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-base font-medium'>
              {t('activeProjects')}
            </CardTitle>
            <Button variant='ghost' size='icon'>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {data.recentProjects.map((proj, idx) => (
                <ProjectItem
                  key={proj.id}
                  image={`/avatars/0${idx + 5}.png`}
                  name={proj.name}
                  ordersCount={proj.taskCount}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Employees */}
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-base font-medium'>
              {t('topEmployees')}
            </CardTitle>
            <Button variant='ghost' size='icon'>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {TOP_EMPLOYEES.map((emp, idx) => (
                <EmployeeItem key={emp.id + idx} {...emp} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Integrate App */}
        <Card className='gap-0'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-base font-medium'>
              Kết nối ứng dụng
            </CardTitle>
            <Button variant='ghost' size='icon'>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </CardHeader>
          <CardContent className='p-0'>
            <IntegrateApp />
          </CardContent>
        </Card>

        {/* Recent Tasks */}
        {/* <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-base font-medium'>
              {t('recentTasks')}
            </CardTitle>
            <Button variant='link' className='h-auto p-0 text-blue-600'>
              {t('viewAll', { ns: 'common' })}
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('recentTasks.task')}</TableHead>
                  <TableHead>{t('recentTasks.assignedTo')}</TableHead>
                  <TableHead>{t('recentTasks.project')}</TableHead>
                  <TableHead>{t('recentTasks.dueDate')}</TableHead>
                  <TableHead>{t('recentTasks.status')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {RECENT_TASKS.map((task, idx) => (
                  <TableRow key={task.task + idx}>
                    <TableCell>{task.task}</TableCell>
                    <TableCell className='text-blue-600'>
                      {task.assignedTo}
                    </TableCell>
                    <TableCell>{task.project}</TableCell>
                    <TableCell>{task.dueDate}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full bg-${task.statusColor}-100 px-2 py-1 text-xs font-medium text-${task.statusColor}-800`}
                      >
                        <span
                          className={`mr-1 h-1.5 w-1.5 rounded-full bg-${task.statusColor}-500`}
                        ></span>
                        {task.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card> */}
      </div>
    </Main>
  )
}
