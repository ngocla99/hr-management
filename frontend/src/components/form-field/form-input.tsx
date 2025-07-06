import * as React from 'react'
import { useFormContext } from 'react-hook-form'
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
}

export const FormInput = ({
  type,
  name,
  label,
  placeholder,
  required,
  InputComponent = Input,
  ...props
}: FormInputProps) => {
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
              {required && <span className='text-destructive'>*</span>}
            </FormLabel>
          )}
          <FormControl>
            <InputComponent
              type={type}
              placeholder={placeholder}
              {...field}
              {...props}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
