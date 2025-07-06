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
import { SignUpForm } from './components/sign-up-form'

export default function SignUp() {
  const { t } = useTranslation()

  return (
    <AuthLayout>
      <Card className='gap-4'>
        <CardHeader>
          <CardTitle className='text-lg tracking-tight'>
            {t('signUp', { ns: 'auth' })}
          </CardTitle>
          <CardDescription>
            {t('signUpSubtitle', { ns: 'auth' })} <br />
            {t('alreadyHaveAccount', { ns: 'auth' })}{' '}
            <Link
              to='/sign-in'
              className='hover:text-primary underline underline-offset-4'
            >
              {t('login', { ns: 'auth' })}
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
        <CardFooter>
          <p className='text-muted-foreground px-8 text-center text-sm'>
            {t('termsAndPrivacy', { ns: 'auth' })}
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}
