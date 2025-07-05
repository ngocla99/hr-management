import * as React from 'react'
import Lottie from 'lottie-react'
import visibility from '@/assets/lotties/eye/visibility-V3.json'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

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
        <input
          type={showPassword ? 'text' : 'password'}
          className='border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50'
          ref={ref}
          disabled={disabled}
          {...props}
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
            style={{ width: '18px', height: '18px' }}
            onDOMLoaded={handleLottieLoad}
          />
        </Button>
      </div>
    )
  }
)
PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
