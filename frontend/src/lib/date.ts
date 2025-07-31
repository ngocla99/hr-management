import { format } from 'date-fns'

interface FormatDateOptions {
  period: 'date' | 'month' | 'year' | 'datetime' | 'dateWeek' | 'time'
}

export const formatDate = (
  date: string | Date,
  options?: FormatDateOptions
) => {
  if (!date) return ''
  switch (options?.period) {
    case 'date':
      return format(date, 'dd/MM/yyyy')
    case 'datetime':
      return format(date, 'dd/MM/yyyy HH:mm')
    case 'dateWeek':
      return format(date, 'dd/MM/yyyy (E)')
    case 'month':
      return format(date, 'MM/yyyy')
    case 'year':
      return format(date, 'yyyy')
    case 'time':
      return format(date, 'HH:mm a')
    default:
      return format(date, 'dd/MM/yyyy')
  }
}

export const formatDateISO = (date: string | Date) => {
  return new Date(date).toISOString()
}

export const formatDateMappingBackend = (date: string | Date) => {
  return format(date, 'yyyy-MM-dd')
}
