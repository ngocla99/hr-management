import { TFunction } from 'i18next'
import {
  BarChart3 as BarChartIcon,
  BookOpen as BookOpenIcon,
  Clock as ClockIcon,
  Coins as CoinsIcon,
  FileSpreadsheet as FileSpreadsheetIcon,
  FileText as FileTextIcon,
  User as UserIcon,
  Wallet as WalletIcon,
} from 'lucide-react'

export const employeeTabsFn = (t: TFunction) => [
  {
    value: 'personal',
    label: t('tabs.personal', { ns: 'employee' }),
    icon: UserIcon,
  },
  {
    value: 'contract',
    label: t('tabs.contract', { ns: 'employee' }),
    icon: FileTextIcon,
  },
  {
    value: 'payroll',
    label: t('tabs.payroll', { ns: 'employee' }),
    icon: CoinsIcon,
  },
  {
    value: 'time',
    label: t('tabs.time', { ns: 'employee' }),
    icon: ClockIcon,
  },
  {
    value: 'assets',
    label: t('tabs.assets', { ns: 'employee' }),
    icon: BarChartIcon,
    count: 3,
  },
  {
    value: 'document',
    label: t('tabs.document', { ns: 'employee' }),
    icon: FileSpreadsheetIcon,
    count: 6,
  },
  {
    value: 'training',
    label: t('tabs.training', { ns: 'employee' }),
    icon: BookOpenIcon,
  },
  {
    value: 'finance',
    label: t('tabs.finance', { ns: 'employee' }),
    icon: WalletIcon,
  },
]
