import {
  IconLayoutGrid,
  IconList,
  IconUserPlus,
  IconFilter,
  IconDownload,
  IconUpload,
  IconEdit,
  IconMail,
  IconTrash,
} from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Main } from '@/components/layout/main'
import { EmployeeCardView } from './components/employee-card-view'
import { EmployeeDetailView } from './components/employee-detail-view'
import { EmployeeTable } from './components/employee-table'
import { EmployeeProvider, useEmployee } from './context/employee-context'
import { mockEmployees } from './data/mock-employees'

function EmployeeContent() {
  const { t } = useTranslation()
  const {
    viewMode,
    setViewMode,
    selectedEmployee,
    isDetailViewOpen,
    setIsDetailViewOpen,
    handleEmployeeView,
    handleEmployeeEdit,
    handleEmployeeDelete,
    handleEmployeeInvite,
  } = useEmployee()

  const totalEmployees = mockEmployees.length
  const selectedCount = 3 // This would come from selection state in a real app

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
                <Button variant='ghost' size='sm' className='text-blue-600'>
                  <IconFilter className='mr-1 h-4 w-4' />
                  Filter
                </Button>
              </div>
              {selectedCount > 0 && (
                <div className='mt-2 flex items-center space-x-4'>
                  <span className='text-sm text-gray-600'>
                    {selectedCount} Selected
                  </span>
                  <div className='flex items-center space-x-2'>
                    <Button variant='ghost' size='sm'>
                      <IconEdit className='mr-1 h-4 w-4' />
                      {t('edit', { ns: 'common' })}
                    </Button>
                                         <Button variant='ghost' size='sm'>
                       <IconMail className='mr-1 h-4 w-4' />
                       Invitation Email
                     </Button>
                    <Button variant='ghost' size='sm' className='text-red-600'>
                      <IconTrash className='mr-1 h-4 w-4' />
                      {t('delete', { ns: 'common' })}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className='flex items-center space-x-3'>
              {/* Action Buttons */}
              <Button variant='outline' size='sm'>
                <IconDownload className='mr-2 h-4 w-4' />
                {t('export', { ns: 'common' })}
              </Button>
              <Button variant='outline' size='sm'>
                <IconUpload className='mr-2 h-4 w-4' />
                {t('import', { ns: 'common' })}
              </Button>
                             <Button size='sm'>
                 <IconUserPlus className='mr-2 h-4 w-4' />
                 Add Employee
               </Button>

              {/* View Toggle */}
              <div className='flex items-center rounded-lg border p-1'>
                <Button
                  variant={viewMode === 'table' ? 'default' : 'ghost'}
                  size='sm'
                  onClick={() => setViewMode('table')}
                  className='h-8 px-3'
                >
                  <IconList className='h-4 w-4' />
                </Button>
                <Button
                  variant={viewMode === 'card' ? 'default' : 'ghost'}
                  size='sm'
                  onClick={() => setViewMode('card')}
                  className='h-8 px-3'
                >
                  <IconLayoutGrid className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className='-mx-4 flex-1 overflow-auto px-4 py-1'>
            {viewMode === 'table' ? (
              <EmployeeTable
                onEmployeeView={handleEmployeeView}
                onEmployeeEdit={handleEmployeeEdit}
                onEmployeeDelete={handleEmployeeDelete}
                onEmployeeInvite={handleEmployeeInvite}
              />
            ) : (
              <EmployeeCardView
                onEmployeeView={handleEmployeeView}
                onEmployeeEdit={handleEmployeeEdit}
                onEmployeeDelete={handleEmployeeDelete}
                onEmployeeInvite={handleEmployeeInvite}
              />
            )}
          </div>
        </div>
      </Main>

      {/* Detail View */}
      <EmployeeDetailView
        employee={selectedEmployee}
        open={isDetailViewOpen}
        onOpenChange={setIsDetailViewOpen}
        onEdit={handleEmployeeEdit}
        onDelete={handleEmployeeDelete}
      />
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
