import { logInApi } from '@/api/services/auth'
import { FormInput } from '@/components/form-field/form-input'
import { PasswordInput } from '@/components/password-input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { useAuth } from '@/stores/auth-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Link, useRouter } from '@tanstack/react-router'
import { HTMLAttributes } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { z } from 'zod'
import { FacebookSignIn } from './facebook-sign-in'
import { TwitterSignIn } from './twitter-sign-in'

type UserAuthFormProps = HTMLAttributes<HTMLFormElement>

const formSchema = z.object({
  email: z.string().min(1, { message: 'Please enter your email' }),
  password: z
    .string()
    .min(1, {
      message: 'Please enter your password',
    })
    .min(7, {
      message: 'Password must be at least 7 characters long',
    }),
})

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { t } = useTranslation()
  const { setAccessToken } = useAuth()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const logInMutation = useMutation({
    mutationFn: logInApi,
    onSuccess: (data) => {
      setAccessToken(data.accessToken)
      toast.success(t('loginSuccess', { ns: 'auth' }))
      router.navigate({ to: '/' })
    },
    onError: () => {
      toast.error(t('loginFailed', { ns: 'auth' }))
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (logInMutation.isPending) return
    logInMutation.mutate(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-3', className)}
        {...props}
      >
        <FormInput
          name='email'
          label={t('email', { ns: 'auth' })}
          placeholder={t('emailPlaceholder', { ns: 'auth' })}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel>{t('password', { ns: 'auth' })}</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder={t('passwordPlaceholder', { ns: 'auth' })}
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <Link
                to='/forgot-password'
                className='text-muted-foreground absolute -top-0.5 right-0 text-sm font-medium hover:opacity-75'
              >
                {t('forgotPassword', { ns: 'auth' })}
              </Link>
            </FormItem>
          )}
        />
        <Button className='mt-2' disabled={logInMutation.isPending}>
          {logInMutation.isPending
            ? t('loggingIn', { ns: 'auth' })
            : t('login', { ns: 'auth' })}
        </Button>

        <div className='text-center text-sm'>
          <span className='text-muted-foreground'>
            {t('dontHaveAccount', { ns: 'auth' })}{' '}
          </span>
          <Link
            to='/sign-up'
            className='text-primary font-medium hover:underline'
          >
            {t('signUp', { ns: 'auth' })}
          </Link>
        </div>

        <div className='relative my-2'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background text-muted-foreground px-2'>
              {t('orContinueWith', { ns: 'auth' })}
            </span>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <FacebookSignIn disabled={logInMutation.isPending} />
          <TwitterSignIn disabled={logInMutation.isPending} />
        </div>
      </form>
    </Form>
  )
}
