import React from 'react'
import Cookies from 'js-cookie'
import { Outlet } from '@tanstack/react-router'
import { IconPlus } from '@tabler/icons-react'
import { useAuth } from '@/stores/auth-store'
import { cn } from '@/lib/utils'
import { SearchProvider } from '@/context/search-context'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import SkipToMain from '@/components/skip-to-main'
import { useMe } from '@/features/user/api/get-me'
import { LanguageSwitch } from '../language-switch'
import { ProfileDropdown } from '../profile-dropdown'
import { Search } from '../search'
import { ThemeSwitch } from '../theme-switch'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Header } from './header'
import { NavBreadcrumb } from './nav-breadcrumb'

interface Props {
  children?: React.ReactNode
}

export function AuthenticatedLayout({ children }: Props) {
  const defaultOpen = Cookies.get('sidebar_state') !== 'false'
  const { setUser } = useAuth()

  const { data: me } = useMe()

  React.useEffect(() => {
    if (me) {
      setUser(me)
    }
  }, [me])

  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <SkipToMain />
        <Header fixed>
          <NavBreadcrumb />
          <div className='ml-auto flex h-full items-center space-x-2'>
            <Button variant='secondary' size='icon'>
              <IconPlus />
            </Button>
            <Separator
              orientation='vertical'
              className='bg-sidebar-border mr-4 ml-2 h-5!'
            />
            <Search />
            <LanguageSwitch />
            <ThemeSwitch />
            <ProfileDropdown className='ml-2' />
          </div>
        </Header>
        <AppSidebar className='pt-16 shadow-sm group-data-[side=left]:border-r-0' />
        <div
          id='content'
          className={cn(
            'ml-auto w-full max-w-full pt-16',
            'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
            'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
            'sm:transition-[width] sm:duration-200 sm:ease-linear',
            'flex h-svh flex-col',
            'group-data-[scroll-locked=1]/body:h-full',
            'has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh'
          )}
        >
          {children ? children : <Outlet />}
        </div>
      </SidebarProvider>
    </SearchProvider>
  )
}
