import { EmployeeStatus } from '../types/employee.types'

// Status styling similar to user feature
export const employeeStatusStyles = new Map([
  [EmployeeStatus.UNVERIFIED, 'warning'],
  [EmployeeStatus.ACTIVE, 'success'],
  [EmployeeStatus.NOT_ACTIVE, 'dark'],
])
