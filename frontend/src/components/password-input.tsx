import * as React from 'react'
import Lottie from 'lottie-react'
import visibility from '@/assets/lotties/eye/visibility-V3.json'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Input } from './ui/input'

type PasswordInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
>

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, disabled, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const lottieRef = React.useRef<any>(null)

    const handleTogglePassword = () => {
      setShowPassword((prev) => !prev)
      if (lottieRef.current) {
        if (!showPassword) {
          lottieRef.current.playSegments([17, 0], true)
        } else {
          lottieRef.current.playSegments([0, 17], true)
        }
      }
    }

    const handleLottieLoad = () => {
      if (lottieRef.current) {
        lottieRef.current.playSegments([0, 17], true)
      }
    }

    return (
      <div className={cn('relative rounded-md', className)}>
        <Input
          ref={ref}
          disabled={disabled}
          {...props}
          type={showPassword ? 'text' : 'password'}
        />
        <Button
          type='button'
          size='icon'
          variant='ghost'
          disabled={disabled}
          className='text-muted-foreground absolute top-1/2 right-1 h-6 w-6 -translate-y-1/2 rounded-md'
          onClick={handleTogglePassword}
        >
          <Lottie
            lottieRef={lottieRef}
            animationData={visibility}
            loop={false}
            autoplay={false}
            className='size-4.5 dark:invert'
            onDOMLoaded={handleLottieLoad}
          />
        </Button>
      </div>
    )
  }
)
PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
