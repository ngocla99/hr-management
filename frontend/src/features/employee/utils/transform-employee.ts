import { EmployeeApi } from '@/types/api'
import { Employee } from '../type/employee'

export const transformEmployee = (employee: EmployeeApi): Employee => {
  if (typeof employee.userId === 'string') {
    return {
      ...employee,
      userId: employee.userId,
    }
  }

  return {
    ...employee,
    userId: employee.userId.id,
    username: employee.userId.username,
    firstName: employee.userId.firstName,
    lastName: employee.userId.lastName,
    fullName: employee.userId.fullName,
    email: employee.userId.email,
    avatar: employee.userId.avatar,
    dateOfBirth: employee.userId.dateOfBirth,
    age: employee.userId.age,
    phoneNumber: employee.userId.phoneNumber,
    gender: employee.userId.gender,
    status: employee.userId.status,
    bio: employee.userId.bio,
  }
}
