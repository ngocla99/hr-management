import ViteLogo from '@/assets/vite.svg'
import { useTranslation } from 'react-i18next'
import { UserAuthForm } from './components/user-auth-form'

export default function SignIn2() {
  const { t } = useTranslation()

  return (
    <div className='relative container grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r'>
        <div className='absolute inset-0 bg-zinc-900' />
        <div className='relative z-20 flex items-center text-lg font-medium'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='mr-2 h-6 w-6'
          >
            <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
          </svg>
          {t('appName', { ns: 'auth' })}
        </div>

        <img
          src={ViteLogo}
          className='relative m-auto'
          width={301}
          height={60}
          alt='Vite'
        />
      </div>
      <div className='lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-left'>
            <h1 className='text-2xl font-semibold tracking-tight'>{t('signInTitle', { ns: 'auth' })}</h1>
            <p className='text-muted-foreground text-sm'>
              {t('signInSubtitle', { ns: 'auth' })}
            </p>
          </div>
          <UserAuthForm />
          {/* <p className='text-muted-foreground px-8 text-center text-sm'>
            {t('termsAndPrivacy', { ns: 'auth' })}{' '}
            <a
              href='/terms'
              className='hover:text-primary underline underline-offset-4'
            >
              {t('termsOfService', { ns: 'common' })}
            </a>{' '}
            and{' '}
            <a
              href='/privacy'
              className='hover:text-primary underline underline-offset-4'
            >
              {t('privacyPolicy', { ns: 'common' })}
            </a>
            .
          </p> */}
        </div>
      </div>
    </div>
  )
}
