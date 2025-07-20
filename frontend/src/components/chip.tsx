import { Badge } from './ui/badge'

export const Chip = ({ children }: { children: React.ReactNode }) => {
  return (
    <Badge
      className='bg-chart-2 rounded-full px-2 py-1 text-white'
      variant='success'
    >
      {children}
    </Badge>
  )
}
