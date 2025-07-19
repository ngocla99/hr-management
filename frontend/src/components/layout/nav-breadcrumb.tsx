import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { useBreadcrumbs, type BreadcrumbConfig } from '@/hooks/use-breadcrumbs'
import { Link } from '@tanstack/react-router'
import { Building2, HelpCircle, MessageCircle, Settings } from 'lucide-react'
import { Separator } from '../ui/separator'

const breadcrumbConfig: BreadcrumbConfig = {
  organization: {
    label: 'Organization',
    icon: <Building2 className='size-4' />,
  },
  settings: {
    label: 'Settings',
    icon: <Settings className='size-4' />,
  },
  chats: {
    label: 'Chats',
    icon: <MessageCircle className='size-4' />,
  },
  'help-center': {
    label: 'Help Center',
    icon: <HelpCircle className='size-4' />,
  },
}

export function NavBreadcrumb() {
  const { breadcrumbs } = useBreadcrumbs(breadcrumbConfig)

  // Don't show breadcrumbs on home page
  if (breadcrumbs.length <= 1) {
    return null
  }

  return (
    <>
      <Separator orientation='vertical' className='bg-sidebar-border h-5!' />

      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className='flex items-center gap-2'
            >
              <BreadcrumbItem>
                {item.isCurrent ? (
                  <BreadcrumbPage className='text-sidebar flex items-center gap-2'>
                    {item.icon}
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    asChild
                    className='text-sidebar flex items-center gap-2'
                  >
                    <Link to={item.href!} search={item.search}>
                      {item.icon}
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadcrumbs.length - 1 && (
                <BreadcrumbSeparator className='text-sidebar' />
              )}
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  )
}
