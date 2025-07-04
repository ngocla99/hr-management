import { useTranslation } from 'react-i18next'

export interface EmployeeItemProps {
  image: string
  name: string
  id: number
  salesCount: number
}

export function EmployeeItem({
  image,
  name,
  id,
  salesCount,
}: EmployeeItemProps) {
  const { t } = useTranslation(['dashboard'])
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-3'>
        <img
          src={image || '/placeholder.svg'}
          width={40}
          height={40}
          alt={name}
          className='rounded'
        />
        <div>
          <h4 className='font-medium'>{name}</h4>
          <p className='text-muted-foreground text-xs'>
            {t('employee.id', { id })}
          </p>
        </div>
      </div>
      <div className='text-sm'>
        {t('employee.sales', { count: salesCount })}
      </div>
    </div>
  )
}
