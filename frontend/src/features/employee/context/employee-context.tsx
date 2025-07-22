import React, { useState } from 'react'
import { User } from '@/types/api'
import useDialogState from '@/hooks/use-dialog-state'

type EmployeeDialogType = 'invite' | 'add' | 'delete' | 'view'

interface EmployeeContextType {
  open: EmployeeDialogType | null
  setOpen: (str: EmployeeDialogType | null) => void
  currentRow: User | null
  setCurrentRow: React.Dispatch<React.SetStateAction<User | null>>
}

const EmployeeContext = React.createContext<EmployeeContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function EmployeeProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<EmployeeDialogType>(null)
  const [currentRow, setCurrentRow] = useState<User | null>(null)

  return (
    <EmployeeContext.Provider
      value={{
        open,
        setOpen,
        currentRow,
        setCurrentRow,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useEmployee = () => {
  const employeeContext = React.useContext(EmployeeContext)

  if (!employeeContext) {
    throw new Error('useEmployee has to be used within <EmployeeContext>')
  }

  return employeeContext
}
