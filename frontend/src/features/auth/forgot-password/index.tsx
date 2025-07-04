import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import AuthLayout from '../auth-layout'
import { ForgotPasswordForm } from './components/forgot-password-form'

export default function ForgotPassword() {
  const { t } = useTranslation()

  return (
    <AuthLayout>
      <Card className='gap-4'>
        <CardHeader>
          <CardTitle className='text-lg tracking-tight'>
            {t('forgotPasswordTitle', { ns: 'auth' })}
          </CardTitle>
          <CardDescription>
            {t('forgotPasswordSubtitle', { ns: 'auth' })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
        <CardFooter>
          <p className='text-muted-foreground px-8 text-center text-sm'>
            {t('dontHaveAccount', { ns: 'auth' })}{' '}
            <Link
              to='/sign-up'
              className='hover:text-primary underline underline-offset-4'
            >
              {t('signUp', { ns: 'auth' })}
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}
