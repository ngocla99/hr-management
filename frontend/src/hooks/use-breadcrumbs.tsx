import { useMemo } from 'react'
import { useLocation, useRouter } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export interface BreadcrumbItem {
  label: string
  href?: string
  isCurrent?: boolean
  search?: Record<string, any>
  icon?: React.ReactNode
}

export interface BreadcrumbConfig {
  [key: string]: {
    label: string
    icon?: React.ReactNode
    skipInBreadcrumb?: boolean
  }
}

export function useBreadcrumbs(config?: BreadcrumbConfig) {
  const { pathname, search } = useLocation()
  const { t } = useTranslation(['glossary'])
  const router = useRouter()

  const breadcrumbs = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean)
    const breadcrumbItems: BreadcrumbItem[] = []

    if (segments.length === 0) {
      return breadcrumbItems
    }

    // Handle authenticated routes
    if (segments[0] === '_authenticated') {
      segments.shift() // Remove _authenticated from segments
    }

    let currentPath = ''

    segments.forEach((segment, index) => {
      currentPath += `/${segment}`

      // Skip route groups (wrapped in parentheses)
      if (segment.startsWith('(') && segment.endsWith(')')) {
        return
      }

      if (config?.[segment]?.skipInBreadcrumb) {
        return
      }

      let label = segment
      let icon: React.ReactNode | undefined

      if (config?.[segment]) {
        label = config[segment].label
        icon = config[segment].icon
      } else {
        const segmentLabelMap: Record<string, string> = {
          organization: t('organization'),
          user: t('users'),
          employee: t('employees'),
          structure: t('structure'),
          report: t('report'),
          settings: t('settings'),
          chats: t('chats'),
          'help-center': t('helpCenter'),
          account: t('account'),
          profile: t('profile'),
          appearance: t('appearance'),
          notifications: t('notifications'),
          display: t('display'),
        }

        label =
          segmentLabelMap[segment] ??
          segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')
      }

      const isLast = index === segments.length - 1

      // For the last item, preserve search parameters if they exist
      const searchParams = isLast ? search : undefined

      breadcrumbItems.push({
        label,
        href: isLast ? undefined : currentPath,
        isCurrent: isLast,
        search: searchParams,
        icon,
      })
    })

    return breadcrumbItems
  }, [pathname, search, t, config])

  const navigateToBreadcrumb = (item: BreadcrumbItem) => {
    if (!item.href) return

    if (item.search) {
      router.navigate({
        to: item.href as any,
        search: item.search as any,
      })
    } else {
      router.navigate({
        to: item.href as any,
      })
    }
  }

  const getBreadcrumbTitle = () => {
    const currentBreadcrumb = breadcrumbs.find((item) => item.isCurrent)
    return currentBreadcrumb?.label || t('dashboard')
  }

  return {
    breadcrumbs,
    navigateToBreadcrumb,
    getBreadcrumbTitle,
  }
}
