import { IconSearch } from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import { useSearch } from '@/context/search-context'
import { Button } from './ui/button'

interface Props {
  className?: string
  type?: React.HTMLInputTypeAttribute
}

export function Search({ className = '' }: Props) {
  const { setOpen } = useSearch()
  return (
    <Button
      size='icon'
      className={cn('bg-sidebar-border hover:bg-sidebar-border/80', className)}
      onClick={() => setOpen(true)}
    >
      <IconSearch aria-hidden='true' />
    </Button>
  )
}
