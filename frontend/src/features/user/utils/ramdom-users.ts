import { faker } from '@faker-js/faker'
import {
  BLOOD_TYPES,
  DEPARTMENTS,
  EMPLOYMENT_TYPES,
  GENDERS,
  JOB_LEVELS,
  JOB_ROLES,
  MARITAL_STATUSES,
} from '@/features/employee/constants/employee-constants'
import { USER_ROLES } from '../constants/user-constants'

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

export function generateRandomUsers(count: number) {
  const users = []
  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName().toLowerCase()
    const lastName = faker.person.lastName().toLowerCase()
    const email = faker.internet.email({ firstName, lastName })
    const phoneNumber = generatePhoneNumber()
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
    const employeeId = faker.string.uuid()
    const dateStarted = faker.date.past()
    const contractEndDate = faker.date.future()
    const password = 'Qwe123!@#'
    const role = faker.helpers.arrayElement(USER_ROLES)
    users.push({
      email,
      firstName,
      lastName,
      password,
      role,
      avatar,
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
      employeeId,
      dateStarted,
      contractEndDate,
    })
  }
  return users
}
