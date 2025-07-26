import {
  IconBrowserCheck,
  IconHelp,
  IconLayoutDashboard,
  IconLayoutGrid,
  IconMessages,
  IconNotification,
  IconPalette,
  IconReport,
  IconSettings,
  IconTool,
  IconUser,
  IconUserCog,
  IconUsers,
} from '@tabler/icons-react'
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react'
import { SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Tutti',
      logo: Command,
      plan: 'simplifyYourWorkflow',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'startup',
    },
  ],
  navGroups: [
    {
      title: 'general',
      items: [
        {
          title: 'dashboard',
          url: '/',
          icon: IconLayoutDashboard,
        },
        {
          title: 'chats',
          url: '/chats',
          badge: '3',
          icon: IconMessages,
          disabled: true,
        },
      ],
    },
    {
      title: 'organization',
      items: [
        {
          title: 'users',
          url: '/organization/user',
          icon: IconUsers,
        },
        {
          title: 'employees',
          url: '/organization/employee',
          icon: IconUser,
        },
        {
          title: 'structure',
          url: '/organization/structure',
          icon: IconLayoutGrid,
        },
        {
          title: 'report',
          url: '/organization/report',
          icon: IconReport,
        },
      ],
    },
    {
      title: 'other',
      items: [
        {
          title: 'settings',
          icon: IconSettings,
          items: [
            {
              title: 'profile',
              url: '/settings',
              icon: IconUserCog,
            },
            {
              title: 'account',
              url: '/settings/account',
              icon: IconTool,
            },
            {
              title: 'appearance',
              url: '/settings/appearance',
              icon: IconPalette,
            },
            {
              title: 'notifications',
              url: '/settings/notifications',
              icon: IconNotification,
            },
            {
              title: 'display',
              url: '/settings/display',
              icon: IconBrowserCheck,
            },
          ],
        },
        {
          title: 'helpCenter',
          url: '/help-center',
          icon: IconHelp,
          disabled: true,
        },
      ],
    },
  ],
}
