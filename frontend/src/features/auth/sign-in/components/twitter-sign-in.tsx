import React from 'react'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import twitterAnimation from '@/assets/lotties/twitter/twitter.json'
import { Button } from '@/components/ui/button'

interface TwitterSignInProps {
  disabled: boolean
}

export function TwitterSignIn({ disabled }: TwitterSignInProps) {
  const { t } = useTranslation()
  const twitterLottieRef = React.useRef<LottieRefCurrentProps>(null)

  return (
    <Button
      variant='outline'
      type='button'
      disabled={disabled}
      onMouseEnter={() => {
        if (twitterLottieRef.current) {
          twitterLottieRef.current.play()
        }
      }}
      onMouseLeave={() => {
        if (twitterLottieRef.current) {
          twitterLottieRef.current.stop()
        }
      }}
      onClick={() => {
        toast.info('Twitter authentication is not implemented yet')
      }}
    >
      <Lottie
        lottieRef={twitterLottieRef}
        animationData={twitterAnimation}
        loop={false}
        autoplay={false}
        className='size-6'
      />
      {t('twitter', { ns: 'auth' })}
    </Button>
  )
}
