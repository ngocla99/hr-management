import { z } from 'zod'
import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import { MutationConfig } from '@/lib/react-query'

export const signUpSchema = z.object({
  username: z.string().min(1, { message: 'usernameRequired' }),
  email: z
    .string()
    .min(1, { message: 'emailRequired' })
    .email({ message: 'invalidEmail' }),
  password: z
    .string()
    .min(1, { message: 'passwordRequired' })
    .min(7, { message: 'passwordMinLength' }),
})

export type SignUpInput = z.infer<typeof signUpSchema>

export const signUpApi = (input: SignUpInput): Promise<{ userId: string }> => {
  return apiClient.post('/auth/email/register', input)
}

type UseSignUpOptions = {
  mutationConfig?: MutationConfig<typeof signUpApi>
}

export const useSignUp = ({ mutationConfig }: UseSignUpOptions = {}) => {
  const { t } = useTranslation()
  const router = useRouter()

  const { onSuccess, onError, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args)
      toast.success(t('signUpSuccess', { ns: 'auth' }))
      router.navigate({ to: '/sign-in' })
    },
    onError: (error: Error, ...args) => {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.message
          : t('signUpFailed', { ns: 'auth' })
      toast.error(errorMessage)
      onError?.(error, ...args)
    },
    ...restConfig,
    mutationFn: signUpApi,
  })
}
