import { cva } from 'class-variance-authority'
import {
  TIME_SLOTS,
  TOTAL_WORK_DAY_HOURS,
} from '@/features/time-management/constants/time-management-constants'

interface TimelineBarProps {
  segments: Array<{ type: string; hours: number; label?: string }>
}

const hoursToPercentage = (hours: number) => {
  return (hours / TOTAL_WORK_DAY_HOURS) * 100
}

const variantWorkingTime = cva(
  'flex h-full items-center justify-center rounded-md text-xs font-medium',
  {
    variants: {
      variant: {
        working: 'bg-chart-4',
        break: 'bg-teal-400',
        overtime: 'bg-orange-500',
        late: 'bg-destructive',
        dayoff: 'bg-chart-3',
      },
    },
    defaultVariants: {
      variant: 'working',
    },
  }
)

export function TimelineBar({ segments }: TimelineBarProps) {
  return (
    <div className='col-span-8'>
      <div className='text-muted-foreground mb-2 flex justify-between text-xs'>
        {TIME_SLOTS.map((time) => (
          <span key={time}>{time}</span>
        ))}
      </div>
      <div className='bg-background relative flex h-7 gap-0.5 overflow-hidden rounded'>
        {segments.map((segment, index) => (
          <div
            key={index}
            className={variantWorkingTime({ variant: segment.type as any })}
            style={{ width: `${hoursToPercentage(segment.hours)}%` }}
          >
            {segment.label && (
              <span
                className={
                  segment.type === 'dayoff' ? 'text-gray-800' : 'text-white'
                }
              >
                {segment.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
