import { HTMLAttributes } from 'react'
import { z } from 'zod'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { registerApi } from '@/api/services/auth'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { FormInput } from '@/components/form-field/form-input'
import { PasswordInput } from '@/components/password-input'
import { FacebookSignIn } from '../../sign-in/components/facebook-sign-in'
import { TwitterSignIn } from '../../sign-in/components/twitter-sign-in'

type SignUpFormProps = HTMLAttributes<HTMLFormElement>

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const { t } = useTranslation()
  const router = useRouter()

  const formSchema = z
    .object({
      username: z.string().min(1, {
        message: 'usernameRequired',
      }),
      email: z
        .string()
        .min(1, { message: 'emailRequired' })
        .email({ message: 'invalidEmail' }),
      password: z.string().min(1, { message: 'passwordRequired' }).min(7, {
        message: 'passwordMinLength',
      }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'passwordsDoNotMatch',
      path: ['confirmPassword'],
    })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const signUpMutation = useMutation({
    mutationFn: registerApi,
    onSuccess: () => {
      toast.success(t('signUpSuccess', { ns: 'auth' }))
      router.navigate({ to: '/sign-in' })
    },
    onError: (error) => {
      let errorMessage = t('signUpFailed', { ns: 'auth' })
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message
      }
      toast.error(errorMessage)
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    if (signUpMutation.isPending) return
    signUpMutation.mutate(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-3', className)}
        {...props}
      >
        <FormInput
          name='username'
          label={t('username', { ns: 'glossary' })}
          placeholder={t('usernamePlaceholder', { ns: 'auth' })}
          required
        />
        <FormInput
          name='email'
          label={t('email', { ns: 'auth' })}
          placeholder={t('emailPlaceholder', { ns: 'auth' })}
          required
        />
        <FormInput
          name='password'
          label={t('password', { ns: 'glossary' })}
          placeholder={t('passwordPlaceholder', { ns: 'auth' })}
          InputComponent={PasswordInput}
          required
        />
        <FormInput
          name='confirmPassword'
          label={t('confirmPassword', { ns: 'auth' })}
          placeholder={t('passwordPlaceholder', { ns: 'auth' })}
          InputComponent={PasswordInput}
        />
        <Button className='mt-2' disabled={signUpMutation.isPending}>
          {t('signUp', { ns: 'auth' })}
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
          <FacebookSignIn disabled={signUpMutation.isPending} />
          <TwitterSignIn disabled={signUpMutation.isPending} />
        </div>
      </form>
    </Form>
  )
}
