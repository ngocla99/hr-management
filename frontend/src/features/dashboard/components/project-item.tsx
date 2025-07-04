import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

export interface ProjectItemProps {
  image: string
  name: string
  ordersCount: number
}

export function ProjectItem({ image, name, ordersCount }: ProjectItemProps) {
  const { t } = useTranslation(['dashboard', 'common'])
  const navigate = useNavigate()
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-3'>
        <img
          src={image || '/placeholder.svg'}
          width={40}
          height={40}
          alt={name}
          className='rounded-full'
        />
        <div>
          <h4 className='font-medium'>{name}</h4>
          <p className='text-muted-foreground text-xs'>
            {t('project.orders', { count: ordersCount })}
          </p>
        </div>
      </div>
      <Button
        variant='outline'
        size='sm'
        className='h-8'
        onClick={() => {
          navigate({
            to: '/projects',
          })
        }}
      >
        {t('viewAll', { ns: 'common' })}
      </Button>
    </div>
  )
}
