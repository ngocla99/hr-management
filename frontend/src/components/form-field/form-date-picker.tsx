import { useFormContext } from 'react-hook-form'
import { CalendarIcon } from 'lucide-react'
import { formatDate } from '@/lib/date'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface FormDatePickerProps {
  name: string
  label?: string
  placeholder?: string
  description?: string
  required?: boolean
  disabled?: boolean
  classes?: {
    root?: string
    label?: string
    input?: string
    message?: string
  }
}

export function FormDatePicker({
  name,
  label,
  placeholder = 'Pick a date',
  description,
  required,
  disabled,
  classes,
  ...props
}: FormDatePickerProps) {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(classes?.root)}>
          <FormLabel className={cn(classes?.label)}>
            {label}
            {required && <span className='text-text-error ml-1'>*</span>}
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'light'}
                  className={cn(
                    'border pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground',
                    classes?.input
                  )}
                >
                  {field.value ? (
                    formatDate(field.value, { period: 'date' })
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='single'
                defaultMonth={field.value}
                selected={field.value}
                onSelect={field.onChange}
                captionLayout='dropdown'
                disabled={disabled}
                {...props}
              />
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className={cn(classes?.message)} />
        </FormItem>
      )}
    />
  )
}
