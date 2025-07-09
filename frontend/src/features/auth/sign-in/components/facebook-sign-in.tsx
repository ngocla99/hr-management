import React from 'react'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import facebookAnimation from '@/assets/lotties/facebook/facebook.json'
import { Button } from '@/components/ui/button'

interface FacebookSignInProps {
  disabled: boolean
}

export function FacebookSignIn({ disabled }: FacebookSignInProps) {
  const { t } = useTranslation()
  const facebookLottieRef = React.useRef<LottieRefCurrentProps>(null)

  return (
    <Button
      variant='outline'
      type='button'
      disabled={disabled}
      onMouseEnter={() => {
        if (facebookLottieRef.current) {
          facebookLottieRef.current.play()
        }
      }}
      onMouseLeave={() => {
        if (facebookLottieRef.current) {
          facebookLottieRef.current.stop()
        }
      }}
      onClick={() => {
        toast.info('Facebook authentication is not implemented yet')
      }}
    >
      <Lottie
        lottieRef={facebookLottieRef}
        animationData={facebookAnimation}
        loop={false}
        autoplay={false}
        className='size-6 dark:invert'
      />
      {t('facebook', { ns: 'auth' })}
    </Button>
  )
}
