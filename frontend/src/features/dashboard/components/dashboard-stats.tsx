import { Link } from '@tanstack/react-router'
import { DashboardOverviewSchema } from '@/lib/validations/dashboard'
import { KpiCard } from './kpi-card'

interface DashboardStatsProps {
  data: DashboardOverviewSchema
}

export function DashboardStats({ data }: DashboardStatsProps) {
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5'>
      <Link to='/projects'>
        <KpiCard
          titleKey='kpi.totalProjects'
          value={data.totalProjects}
          change={0}
          changeTextKey='kpi.changeText.thisMonth'
          bgColor='bg-orange-50'
        />
      </Link>
      <Link to='/tasks' search={{ status: 'Completed' } as any}>
        <KpiCard
          titleKey='kpi.tasksCompleted'
          value={data.tasksByStatus?.Completed ?? 0}
          change={0}
          changeTextKey='kpi.changeText.percent'
          bgColor='bg-green-50'
        />
      </Link>
      <Link to='/tasks' search={{ status: 'InProgress' } as any}>
        <KpiCard
          titleKey='kpi.tasksInProgress'
          value={data.tasksByStatus?.InProgress ?? 0}
          change={0}
          changeTextKey='kpi.changeText.minus'
          bgColor='bg-blue-50'
        />
      </Link>
      <Link to='/tasks' search={{ status: 'Open' } as any}>
        <KpiCard
          titleKey='kpi.overdueTasks'
          value={data.tasksByStatus?.Overdue ?? 0}
          change={0}
          changeTextKey='kpi.changeText.plus'
          bgColor='bg-red-50'
        />
      </Link>
      <Link to='/users'>
        <KpiCard
          titleKey='kpi.activeEmployees'
          value={data.totalUsers}
          change={0}
          changeTextKey=''
          bgColor='bg-purple-50'
        />
      </Link>
    </div>
  )
}
