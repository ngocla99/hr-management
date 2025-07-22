import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function EmployeeCardSkeleton() {
  return (
    <Card className='relative shadow transition-shadow hover:shadow-2xl'>
      <CardContent className='px-6'>
        {/* Header section with status badge and options menu */}
        <div className='mb-4 flex items-start justify-between'>
          <Skeleton className='h-6 w-16 rounded-full' />
          <Skeleton className='h-8 w-8 rounded' />
        </div>

        {/* Profile section */}
        <div className='mb-4 flex flex-col items-center gap-4'>
          {/* Avatar skeleton */}
          <Skeleton className='size-20 rounded-full' />

          {/* Name and title skeleton */}
          <div className='flex flex-col items-center gap-2'>
            <Skeleton className='h-6 w-32' />
            <Skeleton className='h-4 w-24' />
          </div>
        </div>

        {/* Information box skeleton */}
        <div className='bg-accent/50 space-y-3 rounded-lg border p-4 shadow-sm'>
          {/* Employee ID skeleton */}
          <div className='flex items-center space-x-2'>
            <Skeleton className='size-4 rounded' />
            <Skeleton className='h-4 w-12' />
          </div>

          {/* Job type and employment type skeleton */}
          <div className='flex items-center space-x-2'>
            <Skeleton className='size-4 rounded' />
            <Skeleton className='h-4 w-20' />
            <Skeleton className='size-1 rounded-full' />
            <Skeleton className='size-4 rounded' />
            <Skeleton className='h-4 w-16' />
          </div>

          {/* Email skeleton */}
          <div className='flex items-center space-x-2'>
            <Skeleton className='size-4 rounded' />
            <Skeleton className='h-5 w-32 rounded-full' />
          </div>

          {/* Phone skeleton */}
          <div className='flex items-center space-x-2'>
            <Skeleton className='size-4 rounded' />
            <Skeleton className='h-5 w-28 rounded-full' />
          </div>
        </div>

        {/* Footer section skeleton */}
        <div className='mt-4 flex items-center justify-between'>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-4 w-20' />
        </div>
      </CardContent>
    </Card>
  )
}

interface EmployeeCardSkeletonGridProps {
  count?: number
}

export function EmployeeCardSkeletonGrid({
  count = 8,
}: EmployeeCardSkeletonGridProps) {
  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {Array.from({ length: count }).map((_, index) => (
          <EmployeeCardSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}
