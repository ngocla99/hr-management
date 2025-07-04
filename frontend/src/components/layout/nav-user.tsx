import { useMutation } from '@tanstack/react-query'
import { Link, useRouter } from '@tanstack/react-router'
import { BadgeCheck, Bell, ChevronsUpDown, LogOut } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { logoutApi } from '@/api/services/auth'
import { useAuth } from '@/stores/auth-store'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

export function NavUser() {
  const { isMobile } = useSidebar()
  const { t } = useTranslation(['glossary', 'common'])
  const router = useRouter()
  const { user, reset } = useAuth()

  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      reset()
      router.navigate({ to: '/sign-in' })
    },
    onError: (error) => {
      // TODO: Remove this after testing
      console.log(error)
      reset()
      router.navigate({ to: '/sign-in' })
    },
  })

  const handleLogout = () => {
    if (logoutMutation.isPending) return
    logoutMutation.mutate()
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage src={'/avatars/01.png'} alt={user?.name} />
                <AvatarFallback className='rounded-lg'>
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>{user?.name}</span>
                <span className='truncate text-xs'>{user?.email}</span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage src={'/avatars/01.png'} alt={user?.name} />
                  <AvatarFallback className='rounded-lg'>
                    {user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>{user?.name}</span>
                  <span className='truncate text-xs'>{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup> */}
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuGroup>
              <DropdownMenuItem asChild disabled>
                <Link to='/settings/account'>
                  <BadgeCheck />
                  {t('account', { ns: 'glossary' })}
                </Link>
              </DropdownMenuItem>
              {/* <DropdownMenuItem asChild>
                <Link to='/settings'>
                  <CreditCard />
                  Billing
                </Link>
              </DropdownMenuItem> */}
              <DropdownMenuItem asChild disabled>
                <Link to='/settings/notifications'>
                  <Bell />
                  {t('notifications', { ns: 'glossary' })}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              {t('logout', { ns: 'common' })}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
