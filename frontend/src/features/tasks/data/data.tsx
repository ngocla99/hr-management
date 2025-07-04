import {
  IconArrowDown,
  IconArrowRight,
  IconArrowUp,
  IconCircle,
  IconCircleCheck,
  IconStopwatch,
} from '@tabler/icons-react'
import i18n from '@/config/i18n'
import { SelectOption } from '@/types/common'

export const labels = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
]

export const statusesFn = () => [
  {
    value: 'Open',
    label: i18n.t('status.open', { ns: 'glossary' }),
    icon: IconCircle,
  },
  {
    value: 'InProgress',
    label: i18n.t('status.inprogress', { ns: 'glossary' }),
    icon: IconStopwatch,
  },
  {
    value: 'Resolved',
    label: i18n.t('status.resolved', { ns: 'glossary' }),
    icon: IconCircleCheck,
  },
  {
    value: 'Completed',
    label: i18n.t('status.completed', { ns: 'glossary' }),
    icon: IconCircleCheck,
  },
]

export const statusOptions: SelectOption[] = statusesFn().map((status) => ({
  label: status.label,
  value: status.value,
}))

export const prioritiesFn = () => [
  {
    value: 'Low',
    label: i18n.t('priority.low', { ns: 'glossary' }),
    icon: IconArrowDown,
  },
  {
    value: 'Medium',
    label: i18n.t('priority.medium', { ns: 'glossary' }),
    icon: IconArrowRight,
  },
  {
    value: 'High',
    label: i18n.t('priority.high', { ns: 'glossary' }),
    icon: IconArrowUp,
  },
]

export const priorityOptions: SelectOption[] = prioritiesFn().map(
  (priority) => ({
    label: priority.label,
    value: priority.value,
  })
)
