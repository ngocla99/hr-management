import { useFormContext } from 'react-hook-form'
import { SelectOption } from '@/types/common'
import { SelectDropdown } from '../select-dropdown'
import { FormField, FormItem, FormLabel, FormMessage } from '../ui/form'

interface FormSelectProps extends React.ComponentProps<'select'> {
  name: string
  label?: string
  placeholder?: string
  required?: boolean
  items: SelectOption[]
}

export const FormSelect = ({
  name,
  label,
  placeholder,
  required,
  items,
  ...props
}: FormSelectProps) => {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className=''>
          {label && (
            <FormLabel>
              {label}
              {required && <span className='text-text-error ml-1'>*</span>}
            </FormLabel>
          )}
          <SelectDropdown
            defaultValue={field.value}
            onValueChange={field.onChange}
            placeholder={placeholder}
            items={items}
            {...props}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
