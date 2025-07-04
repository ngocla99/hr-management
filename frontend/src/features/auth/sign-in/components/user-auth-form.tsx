import { HTMLAttributes } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Link, useRouter } from '@tanstack/react-router'
import { IconBrandFacebook, IconBrandGoogle } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { logInApi } from '@/api/services/auth'
import { useAuth } from '@/stores/auth-store'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'

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
    onError: (error) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : t('loginFailed', { ns: 'auth' })
      toast.error(errorMessage)
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
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('email', { ns: 'auth' })}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('emailPlaceholder', { ns: 'auth' })}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
          <Button
            variant='outline'
            type='button'
            disabled={logInMutation.isPending}
          >
            <IconBrandGoogle className='h-4 w-4' />{' '}
            {t('google', { ns: 'auth' })}
          </Button>
          <Button
            variant='outline'
            type='button'
            disabled={logInMutation.isPending}
          >
            <IconBrandFacebook className='h-4 w-4' />{' '}
            {t('facebook', { ns: 'auth' })}
          </Button>
        </div>
      </form>
    </Form>
  )
}
