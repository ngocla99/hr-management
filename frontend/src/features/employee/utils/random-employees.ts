import { UserRole } from '@/types/api'
import { faker } from '@faker-js/faker'
import {
  BLOOD_TYPES,
  DEPARTMENTS,
  GENDERS,
  JOB_LEVELS,
  JOB_ROLES,
  MARITAL_STATUSES,
  EMPLOYMENT_TYPES,
} from '@/features/employee/constants/employee-constants'

/**
 * Generate a phone number matching regex: /^([+]\d{2})?\d{10}$/
 * @returns A phone number with optional country code and 10 digits
 */
export function generatePhoneNumber(): string {
  const hasCountryCode = faker.datatype.boolean()
  const countryCode = hasCountryCode
    ? `+${faker.number.int({ min: 10, max: 99 })}`
    : ''
  const phoneDigits = faker.string.numeric(10)
  return `${countryCode}${phoneDigits}`
}

export function generateRandomEmployees(count: number) {
  const employees = []
  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName().toLowerCase()
    const lastName = faker.person.lastName().toLowerCase()
    const email = faker.internet.email({ firstName, lastName })
    const phoneNumber = generatePhoneNumber()
    const role = UserRole.EMPLOYEE
    const jobRole = faker.helpers.arrayElement(JOB_ROLES)
    const jobLevel = faker.helpers.arrayElement(JOB_LEVELS)
    const employmentType = faker.helpers.arrayElement(EMPLOYMENT_TYPES)
    const department = faker.helpers.arrayElement(DEPARTMENTS)
    const dateOfBirth = faker.date.birthdate({ min: 18, max: 65, mode: 'age' })
    const gender = faker.helpers.arrayElement(GENDERS)
    const maritalStatus = faker.helpers.arrayElement(MARITAL_STATUSES)
    const bloodType = faker.helpers.arrayElement(BLOOD_TYPES)
    const placeOfBirth = faker.location.city()
    const residentialAddress = faker.location.streetAddress()
    const residentialAddressNotes = faker.lorem.sentence()
    const citizenIdAddress = faker.location.streetAddress()
    const citizenIdAddressNotes = faker.lorem.sentence()
    const emergencyContactPhone = generatePhoneNumber()
    const emergencyContactName = faker.person.fullName()
    const emergencyContactRelationship = faker.helpers.arrayElement([
      'Father',
      'Mother',
      'Spouse',
      'Child',
      'Sibling',
    ])
    const avatar = faker.image.avatar()
    const employeeNumber = faker.string.uuid()
    const hireDate = faker.date.past()
    const password = 'Qwe123!@#'
    employees.push({
      email,
      avatar,
      firstName,
      lastName,
      role,
      password,
      dateOfBirth,
      phoneNumber,
      jobRole,
      jobLevel,
      employmentType,
      department,
      gender,
      maritalStatus,
      bloodType,
      placeOfBirth,
      residentialAddress,
      residentialAddressNotes,
      citizenIdAddress,
      citizenIdAddressNotes,
      emergencyContactPhone,
      emergencyContactName,
      emergencyContactRelationship,
      employeeNumber,
      hireDate,
    })
  }
  return employees
}
