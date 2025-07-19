import React from 'react'
import { IconWorld } from '@tabler/icons-react'
import i18n from '@/config/i18n'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const LANGUAGES = [
  { value: 'en', key: 'languageEn' },
  { value: 'vi', key: 'languageVi' },
]

export function LanguageSwitch() {
  const { t } = useTranslation('common')
  const [lang, setLang] = React.useState(
    () => localStorage.getItem('i18nextLng') || i18n.language || 'vi'
  )

  const handleChange = (value: string) => {
    setLang(value)
    i18n.changeLanguage(value)
    localStorage.setItem('i18nextLng', value)
  }

  React.useEffect(() => {
    if (lang !== i18n.language) {
      i18n.changeLanguage(lang)
    }
  }, [lang])

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          size='icon'
          className='bg-sidebar-border hover:bg-sidebar-border/80'
        >
          <IconWorld className='size-[1.2rem]' />
          <span className='sr-only'>{t('changeLanguage')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {LANGUAGES.map(({ value, key }) => (
          <DropdownMenuItem key={value} onClick={() => handleChange(value)}>
            {t(key as any)}
            {lang === value && (
              <span className='ml-auto'>{/* checkmark or highlight */}✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
