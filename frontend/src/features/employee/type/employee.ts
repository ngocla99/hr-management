import { EmployeeApi, Gender, UserStatus } from '@/types/api'

export type Employee = Omit<EmployeeApi, 'userId'> & {
  userId: string
  username?: string
  firstName?: string
  lastName?: string
  fullName?: string
  email?: string
  avatar?: string
  dateOfBirth?: Date
  age?: number
  phoneNumber?: string
  gender?: Gender
  status?: UserStatus
  bio?: string
}
