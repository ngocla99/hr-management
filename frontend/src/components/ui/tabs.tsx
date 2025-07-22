import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const tabsVariants = cva('flex flex-col gap-2', {
  variants: {
    variant: {
      default: '',
      pills: '',
      underline: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const TabsContext = React.createContext<{
  variant: 'default' | 'pills' | 'underline'
}>({
  variant: 'default',
})

function Tabs({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root> &
  VariantProps<typeof tabsVariants>) {
  const resolvedVariant = variant || 'default'

  return (
    <TabsContext.Provider value={{ variant: resolvedVariant }}>
      <TabsPrimitive.Root
        data-slot='tabs'
        className={cn(tabsVariants({ variant: resolvedVariant }), className)}
        {...props}
      />
    </TabsContext.Provider>
  )
}

const tabsListVariants = cva('inline-flex items-center justify-center', {
  variants: {
    variant: {
      default: 'bg-muted text-muted-foreground h-9 w-fit rounded-lg p-[3px]',
      pills: 'bg-muted text-muted-foreground h-9 w-fit rounded-lg p-[3px]',
      underline: 'h-10 w-full border-b border-border bg-transparent p-0',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  const { variant } = React.useContext(TabsContext)

  return (
    <TabsPrimitive.List
      data-slot='tabs-list'
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

const tabsTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
  {
    variants: {
      variant: {
        default:
          'data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground h-[calc(100%-1px)] flex-1 gap-1.5 rounded-md border border-transparent px-2 py-1 focus-visible:ring-[3px] focus-visible:outline-1 data-[state=active]:shadow-sm',
        pills:
          'data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground h-[calc(100%-1px)] flex-1 gap-1.5 rounded-md border border-transparent px-2 py-1 focus-visible:ring-[3px] focus-visible:outline-1 data-[state=active]:shadow-sm',
        underline:
          'border-b-2 border-transparent px-3 py-1.5 data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground hover:text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const { variant } = React.useContext(TabsContext)

  return (
    <TabsPrimitive.Trigger
      data-slot='tabs-trigger'
      className={cn(tabsTriggerVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot='tabs-content'
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
export type TabsVariant = 'default' | 'pills' | 'underline'
