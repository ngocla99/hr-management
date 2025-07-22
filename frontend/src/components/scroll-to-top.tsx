import { useState, useEffect } from 'react'
import { IconArrowUp } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface ScrollToTopProps {
  threshold?: number
  className?: string
}

export function ScrollToTop({ threshold = 300, className }: ScrollToTopProps) {
  const { t } = useTranslation()
  const [showScrollToTop, setShowScrollToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      setShowScrollToTop(scrollTop > threshold)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (!showScrollToTop) {
    return null
  }

  return (
    <Button
      onClick={scrollToTop}
      size='icon'
      className={cn(
        'fixed right-8 bottom-8 z-50 size-12 rounded-full shadow-lg',
        'transition-all duration-300 ease-in-out',
        'hover:scale-105 hover:shadow-xl',
        'bg-primary text-primary-foreground hover:bg-primary/90',
        className
      )}
      aria-label={t('backToTop', { ns: 'common' })}
    >
      <IconArrowUp className='size-5' />
    </Button>
  )
}
