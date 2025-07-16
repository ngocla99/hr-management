import { 
  IconUser, 
  IconUserCheck, 
  IconUserX,
  IconUsers,
  IconBriefcase,
  IconCalendar,
  IconMapPin
} from '@tabler/icons-react'
import { EmployeeStatus, EmploymentType } from '../types/employee.types'
import { EMPLOYEE_TEAMS, EMPLOYEE_DEPARTMENTS } from './employee-constants'

export const employeeStatusOptions = [
  {
    labelKey: 'active',
    value: EmployeeStatus.ACTIVE,
    icon: IconUserCheck,
  },
  {
    labelKey: 'notActive', 
    value: EmployeeStatus.NOT_ACTIVE,
    icon: IconUserX,
  },
  {
    labelKey: 'unverified',
    value: EmployeeStatus.UNVERIFIED,
    icon: IconUser,
  },
]

export const employeeTeamOptions = EMPLOYEE_TEAMS.map((team) => ({
  labelKey: team.toLowerCase().replace(' ', ''),
  value: team,
  icon: IconUsers,
}))

export const employeeDepartmentOptions = EMPLOYEE_DEPARTMENTS.map((department) => ({
  labelKey: department.toLowerCase().replace(' ', ''),
  value: department,
  icon: IconBriefcase,
}))

export const employmentTypeOptions = [
  {
    labelKey: 'fulltime',
    value: EmploymentType.FULLTIME,
    icon: IconCalendar,
  },
  {
    labelKey: 'parttime',
    value: EmploymentType.PARTTIME, 
    icon: IconCalendar,
  },
  {
    labelKey: 'contract',
    value: EmploymentType.CONTRACT,
    icon: IconCalendar,
  },
  {
    labelKey: 'intern',
    value: EmploymentType.INTERN,
    icon: IconCalendar,
  },
]

// Status styling similar to user feature
export const employeeStatusStyles = new Map([
  [EmployeeStatus.ACTIVE, 'text-green-600 bg-green-50 border-green-200'],
  [EmployeeStatus.NOT_ACTIVE, 'text-red-600 bg-red-50 border-red-200'], 
  [EmployeeStatus.UNVERIFIED, 'text-yellow-600 bg-yellow-50 border-yellow-200'],
]) 