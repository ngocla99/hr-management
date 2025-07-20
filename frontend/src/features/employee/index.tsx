import { Main } from '@/components/layout/main'
import { EmployeeDetailView } from './components/employee-detail-view'
import { EmployeePrimaryButtons } from './components/employee-primary-buttons'
import { EmployeeTable } from './components/employee-table'
import EmployeeProvider from './context/employee-context'
import { mockEmployees } from './data/mock-employees'

function EmployeeContent() {
  const totalEmployees = mockEmployees.length
  const activeEmployees = 28 // This would come from selection state in a real app
  const inactiveEmployees = 12 // This would come from selection state in a real app

  return (
    <>
      <Main>
        <div className='space-y-6'>
          {/* Header */}
          <div className='flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
            <div>
              <div className='flex items-center space-x-2'>
                <h1 className='text-2xl font-bold tracking-tight'>
                  {totalEmployees} Employees
                </h1>
              </div>
              <div className='mt-2 flex items-center space-x-4'>
                <div className='flex items-center space-x-1.5 text-xs'>
                  <div className='size-1.5 rounded-full bg-[#9dc082]' />
                  <span>Active {activeEmployees}</span>
                </div>
                <div className='flex items-center space-x-1.5 text-xs'>
                  <div className='size-1.5 rounded-full bg-[#1d212c]' />
                  <span>Inactive {inactiveEmployees}</span>
                </div>
              </div>
            </div>

            <EmployeePrimaryButtons />
          </div>
          <div className='-mx-4 flex-1 overflow-auto px-4 py-1'>
            <EmployeeTable />
          </div>
        </div>
      </Main>

      <EmployeeDetailView />
    </>
  )
}

export default function Employee() {
  return (
    <EmployeeProvider>
      <EmployeeContent />
    </EmployeeProvider>
  )
}
