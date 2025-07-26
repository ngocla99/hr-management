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

const TextareaWithCharCount = ({
  maxLength,
  onChange,
  value,
  ...props
}: React.ComponentProps<'textarea'> & { maxLength?: number }) => {
  const stringValue = String(value || '')
  const [charCount, setCharCount] = React.useState(stringValue.length)

  React.useEffect(() => {
    const currentValue = String(value || '')
    setCharCount(currentValue.length)
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length)
    onChange?.(e)
  }

  return (
    <div className=''>
      <Textarea
        maxLength={maxLength}
        className='break-all'
        onChange={handleChange}
        value={value}
        {...props}
      />
      {maxLength && (
        <div className='mt-1 flex justify-end'>
          <span className='text-text-secondary text-sm'>
            {charCount}/{maxLength}
          </span>
        </div>
      )}
    </div>
  )
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
            <TextareaWithCharCount
              placeholder={placeholder}
              maxLength={maxLength}
              {...props}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
