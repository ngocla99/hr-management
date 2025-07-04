import { useTranslation } from 'react-i18next'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'

export const description = 'A multiple line chart'

const data = [
  {
    name: 'Tháng 1',
    total: Math.floor(Math.random() * 10) + 1,
  },
  {
    name: 'Tháng 2',
    total: Math.floor(Math.random() * 10) + 1,
  },
  {
    name: 'Tháng 3',
    total: Math.floor(Math.random() * 10) + 1,
  },
  {
    name: 'Tháng 4',
    total: Math.floor(Math.random() * 10) + 1,
  },
  {
    name: 'Tháng 5',
    total: Math.floor(Math.random() * 10) + 1,
  },
  {
    name: 'Tháng 6',
    total: Math.floor(Math.random() * 10) + 1,
  },
  {
    name: 'Tháng 7',
    total: Math.floor(Math.random() * 10) + 1,
  },
  {
    name: 'Tháng 8',
    total: Math.floor(Math.random() * 10) + 1,
  },
  {
    name: 'Tháng 9',
    total: Math.floor(Math.random() * 10) + 1,
  },
  {
    name: 'Tháng 10',
    total: Math.floor(Math.random() * 10) + 1,
  },
  {
    name: 'Tháng 11',
    total: Math.floor(Math.random() * 10) + 1,
  },
  {
    name: 'Tháng 12',
    total: Math.floor(Math.random() * 10) + 1,
  },
]

export function DashboardChart() {
  const { t } = useTranslation('dashboard')

  const chartConfig = {
    completed: {
      label: t('chart.completed'),
      color: 'var(--chart-1)',
    },
    inProgress: {
      label: t('chart.inProgress'),
      color: 'var(--chart-2)',
    },
  } satisfies ChartConfig

  return (
    <ChartContainer config={chartConfig}>
      <ResponsiveContainer width='100%' height={300} maxHeight={300}>
        <BarChart data={data}>
          <XAxis
            dataKey='name'
            stroke='#888888'
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke='#888888'
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Bar
            dataKey='total'
            fill='currentColor'
            radius={[4, 4, 0, 0]}
            className='fill-primary'
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
