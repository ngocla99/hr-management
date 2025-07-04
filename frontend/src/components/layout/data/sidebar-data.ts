import {
  IconBrowserCheck,
  IconChecklist,
  IconHelp,
  IconLayoutDashboard,
  IconLayoutGrid,
  IconMessages,
  IconNotification,
  IconPackages,
  IconPalette,
  IconSettings,
  IconTool,
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
      name: 'Next gERP',
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
          title: 'tasks',
          url: '/tasks',
          icon: IconChecklist,
        },
        {
          title: 'projects',
          url: '/projects',
          icon: IconLayoutGrid,
        },
        {
          title: 'apps',
          url: '/apps',
          icon: IconPackages,
        },
        {
          title: 'chats',
          url: '/chats',
          badge: '3',
          icon: IconMessages,
          disabled: true,
        },
        {
          title: 'users',
          url: '/users',
          icon: IconUsers,
        },
        // {
        //   title: 'Secured by Clerk',
        //   icon: ClerkLogo,
        //   items: [
        //     {
        //       title: 'Sign In',
        //       url: '/clerk/sign-in',
        //     },
        //     {
        //       title: 'Sign Up',
        //       url: '/clerk/sign-up',
        //     },
        //     {
        //       title: 'User Management',
        //       url: '/clerk/user-management',
        //     },
        //   ],
        // },
      ],
    },
    // {
    //   title: 'Pages',
    //   items: [
    //     {
    //       title: 'Auth',
    //       icon: IconLockAccess,
    //       items: [
    //         {
    //           title: 'Sign In',
    //           url: '/sign-in',
    //         },
    //         {
    //           title: 'Sign In (2 Col)',
    //           url: '/sign-in-2',
    //         },
    //         {
    //           title: 'Sign Up',
    //           url: '/sign-up',
    //         },
    //         {
    //           title: 'Forgot Password',
    //           url: '/forgot-password',
    //         },
    //         {
    //           title: 'OTP',
    //           url: '/otp',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'Errors',
    //       icon: IconBug,
    //       items: [
    //         {
    //           title: 'Unauthorized',
    //           url: '/401',
    //           icon: IconLock,
    //         },
    //         {
    //           title: 'Forbidden',
    //           url: '/403',
    //           icon: IconUserOff,
    //         },
    //         {
    //           title: 'Not Found',
    //           url: '/404',
    //           icon: IconError404,
    //         },
    //         {
    //           title: 'Internal Server Error',
    //           url: '/500',
    //           icon: IconServerOff,
    //         },
    //         {
    //           title: 'Maintenance Error',
    //           url: '/503',
    //           icon: IconBarrierBlock,
    //         },
    //       ],
    //     },
    //   ],
    // },
    {
      title: 'other',
      items: [
        {
          title: 'settings',
          icon: IconSettings,
          disabled: true,
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
