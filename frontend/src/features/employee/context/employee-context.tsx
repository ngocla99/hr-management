import React, { useState, createContext, useContext } from 'react'
import { Employee } from '../types/employee.types'

type ViewMode = 'table' | 'card'

interface EmployeeContextType {
  // View mode
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void

  // Selected employee for details/actions
  selectedEmployee: Employee | null
  setSelectedEmployee: (employee: Employee | null) => void

  // Detail view state
  isDetailViewOpen: boolean
  setIsDetailViewOpen: (open: boolean) => void

  // Actions
  handleEmployeeView: (employee: Employee) => void
  handleEmployeeEdit: (employee: Employee) => void
  handleEmployeeDelete: (employee: Employee) => void
  handleEmployeeInvite: (employee: Employee) => void
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(
  undefined
)

interface EmployeeProviderProps {
  children: React.ReactNode
}

export function EmployeeProvider({ children }: EmployeeProviderProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('table')
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  )
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false)

  const handleEmployeeView = (employee: Employee) => {
    setSelectedEmployee(employee)
    setIsDetailViewOpen(true)
  }

  const handleEmployeeEdit = (employee: Employee) => {
    setSelectedEmployee(employee)
    // TODO: Open edit dialog
    console.log('Edit employee:', employee)
  }

  const handleEmployeeDelete = (employee: Employee) => {
    setSelectedEmployee(employee)
    // TODO: Open delete confirmation dialog
    console.log('Delete employee:', employee)
  }

  const handleEmployeeInvite = (employee: Employee) => {
    setSelectedEmployee(employee)
    // TODO: Open invite dialog
    console.log('Invite employee:', employee)
  }

  const value: EmployeeContextType = {
    viewMode,
    setViewMode,
    selectedEmployee,
    setSelectedEmployee,
    isDetailViewOpen,
    setIsDetailViewOpen,
    handleEmployeeView,
    handleEmployeeEdit,
    handleEmployeeDelete,
    handleEmployeeInvite,
  }

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  )
}

export const useEmployee = () => {
  const context = useContext(EmployeeContext)
  if (context === undefined) {
    throw new Error('useEmployee must be used within an EmployeeProvider')
  }
  return context
}

export default EmployeeProvider
