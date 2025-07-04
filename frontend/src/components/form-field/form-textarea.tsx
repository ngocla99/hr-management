import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Textarea } from '../ui/textarea'

interface FormTextareaProps extends React.ComponentProps<'textarea'> {
  name: string
  label?: string
  placeholder?: string
  required?: boolean
  maxLength?: number
}

export const FormTextarea = ({
  name,
  label,
  placeholder,
  required,
  maxLength = 100,
  ...props
}: FormTextareaProps) => {
  const form = useFormContext()
  const [charCount, setCharCount] = React.useState(0)

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
          <FormControl>
            <div className=''>
              <Textarea
                placeholder={placeholder}
                maxLength={maxLength}
                className='break-all'
                {...props}
                {...field}
                onChange={(e) => {
                  setCharCount(e.target.value.length)
                  field.onChange(e)
                }}
              />
              {maxLength && (
                <div className='mt-1 flex justify-end'>
                  <span className='text-text-secondary text-sm'>
                    {charCount}/{maxLength}
                  </span>
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
