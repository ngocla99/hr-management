import { Main } from '@/components/layout/main'

export function EmployeeDetailLoading() {
  return (
    <Main>
      <div className='flex h-96 items-center justify-center'>
        <div className='text-center'>
          <div className='border-primary mx-auto h-8 w-8 animate-spin rounded-full border-b-2'></div>
          <p className='text-muted-foreground mt-2'>
            Loading employee details...
          </p>
        </div>
      </div>
    </Main>
  )
}
