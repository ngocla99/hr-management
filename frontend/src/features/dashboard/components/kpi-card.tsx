import { ArrowDown, ArrowUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent } from '@/components/ui/card'

export interface KpiCardProps {
  titleKey: string
  value: string | number
  change: number
  changeTextKey?: string
  bgColor: string
  onClick?: () => void
}

export function KpiCard({
  titleKey,
  value,
  change,
  changeTextKey,
  bgColor,
  onClick,
  ...props
}: KpiCardProps) {
  const { t } = useTranslation(['dashboard'])
  return (
    <Card className={`${bgColor} border-none`} onClick={onClick} {...props}>
      <CardContent className='p-6 text-gray-900'>
        <p className='text-sm font-medium text-gray-900'>
          {t(titleKey as any, { ns: 'dashboard' })}
        </p>
        <h3 className='mt-1 text-2xl font-bold text-gray-900'>{value}</h3>
        <div className='mt-2 flex items-center'>
          {change >= 0 ? (
            <span className='flex items-center text-xs text-green-600'>
              <ArrowUp className='mr-1 h-3 w-3' />
              {change}%
            </span>
          ) : (
            <span className='flex items-center text-xs text-red-600'>
              <ArrowDown className='mr-1 h-3 w-3' />
              {Math.abs(change)}%
            </span>
          )}
          {changeTextKey && (
            <span className='ml-1 text-xs text-gray-500 dark:text-gray-300'>
              {t(changeTextKey as any, { ns: 'dashboard' })}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
