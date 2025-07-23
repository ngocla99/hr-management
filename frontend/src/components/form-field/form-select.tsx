import { useFormContext } from 'react-hook-form'
import { SelectOption } from '@/types/common'
import { cn } from '@/lib/utils'
import { SelectDropdown } from '../select-dropdown'
import { FormField, FormItem, FormLabel, FormMessage } from '../ui/form'

interface FormSelectProps extends React.ComponentProps<'select'> {
  name: string
  label?: string
  placeholder?: string
  required?: boolean
  items: SelectOption[]
  classes?: {
    root?: string
    label?: string
    input?: string
    message?: string
  }
}

export const FormSelect = ({
  name,
  label,
  placeholder,
  required,
  items,
  classes,
  ...props
}: FormSelectProps) => {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(classes?.root)}>
          {label && (
            <FormLabel className={cn(classes?.label)}>
              {label}
              {required && <span className='text-text-error ml-1'>*</span>}
            </FormLabel>
          )}
          <SelectDropdown
            defaultValue={field.value}
            onValueChange={field.onChange}
            placeholder={placeholder}
            items={items}
            className={cn(classes?.input)}
            {...props}
          />
          <FormMessage className={cn(classes?.message)} />
        </FormItem>
      )}
    />
  )
}
