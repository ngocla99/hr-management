import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { useAuth } from '@/stores/auth-store'
import apiClient from '@/lib/api-client'
import { MutationConfig } from '@/lib/react-query'

export const signOutApi = () => {
  return apiClient.post('/auth/logout')
}

type UseSignOutOptions = {
  mutationConfig?: MutationConfig<typeof signOutApi>
}

export const useSignOut = ({ mutationConfig }: UseSignOutOptions = {}) => {
  const { t } = useTranslation()
  const { reset } = useAuth()
  const router = useRouter()

  const { onSuccess, onError, ...restConfig } = mutationConfig || {}

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args)
      reset()
      router.navigate({ to: '/sign-in' })
    },
    onError: (error: Error, ...args) => {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.message
          : t('signOutFailed', { ns: 'auth' })
      toast.error(errorMessage)
      onError?.(error, ...args)
    },
    ...restConfig,
    mutationFn: signOutApi,
  })
}
