import i18n from '@/config/i18n'

export const statusOptionsFn = () => [
  { label: i18n.t('status.active', { ns: 'glossary' }), value: 'active' },
  { label: i18n.t('status.completed', { ns: 'glossary' }), value: 'completed' },
  { label: i18n.t('status.paused', { ns: 'glossary' }), value: 'paused' },
  { label: i18n.t('status.cancelled', { ns: 'glossary' }), value: 'cancelled' },
]

export const statusOptions = statusOptionsFn()
