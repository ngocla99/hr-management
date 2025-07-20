import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        success: 'bg-[#9dc082] text-white [a&]:hover:bg-[#9dc082]/90',
        warning: 'bg-[#f59e0b] text-white [a&]:hover:bg-[#f59e0b]/90',
        info: 'border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 [a&]:hover:bg-blue-200 dark:[a&]:hover:bg-blue-900/30',
        dark: 'bg-[#1d212c] text-white [a&]:hover:bg-[#1d212c]/90',
      },
      size: {
        sm: 'px-1.5 py-0.5 text-xs',
        md: 'px-2 py-1 text-xs',
        lg: 'px-2.5 py-1.5 text-xs',
      },
      withDot: {
        true: 'pl-2',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      withDot: false,
    },
  }
)

function Badge({
  className,
  variant,
  size,
  withDot,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      data-slot='badge'
      className={cn(badgeVariants({ variant, size, withDot }), className)}
      {...props}
    >
      {withDot && (
        <div className='size-1.5 flex-shrink-0 rounded-full bg-white' />
      )}
      {children}
    </Comp>
  )
}

export { Badge, badgeVariants }
