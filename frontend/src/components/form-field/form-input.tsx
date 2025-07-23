import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/lib/utils'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'

interface FormInputProps extends Omit<React.ComponentProps<'input'>, 'size'> {
  type?: React.HTMLInputTypeAttribute
  name: string
  label?: string
  placeholder?: string
  required?: boolean
  InputComponent?: React.ComponentType<React.ComponentProps<'input'>>
  classes?: {
    root?: string
    label?: string
    input?: string
    message?: string
  }
}

export const FormInput = ({
  type,
  name,
  label,
  placeholder,
  required,
  InputComponent = Input,
  classes,
  ...props
}: FormInputProps) => {
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
              {required && <span className='text-destructive'>*</span>}
            </FormLabel>
          )}
          <FormControl>
            <InputComponent
              type={type}
              placeholder={placeholder}
              className={cn(classes?.input)}
              {...field}
              {...props}
            />
          </FormControl>
          <FormMessage className={cn(classes?.message)} />
        </FormItem>
      )}
    />
  )
}
