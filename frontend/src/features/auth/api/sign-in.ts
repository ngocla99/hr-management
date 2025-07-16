import { z } from 'zod'
import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { Auth } from '@/types/api'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { useAuth } from '@/stores/auth-store'
import apiClient from '@/lib/api-client'
import { MutationConfig } from '@/lib/react-query'

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'emailRequired' })
    .email({ message: 'invalidEmail' }),
  password: z
    .string()
    .min(1, { message: 'passwordRequired' })
    .min(7, { message: 'passwordMinLength' }),
})

export type SignInInput = z.infer<typeof signInSchema>

export const signInApi = (input: SignInInput): Promise<Auth> => {
  return apiClient.post('/auth/email/login', input)
}

type UseSignInOptions = {
  mutationConfig?: MutationConfig<typeof signInApi>
}

export const useSignIn = ({ mutationConfig }: UseSignInOptions = {}) => {
  const { t } = useTranslation()
  const { setAccessToken } = useAuth()
  const router = useRouter()

  const { onSuccess, onError, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args)
      const [data] = args
      setAccessToken(data.accessToken)
      toast.success(t('loginSuccess', { ns: 'auth' }))
      router.navigate({ to: '/' })
    },
    onError: (error: Error, ...args) => {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.message
          : t('loginFailed', { ns: 'auth' })
      toast.error(errorMessage)
      onError?.(error, ...args)
    },
    ...restConfig,
    mutationFn: signInApi,
  })
}
