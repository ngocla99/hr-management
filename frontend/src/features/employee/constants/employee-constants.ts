import {
  EmployeeStatus,
  EmploymentType,
  MaritalStatus,
  Gender,
} from '../types/employee.types'

export const EMPLOYEE_TEAMS = [
  'Design Team',
  'Marketing',
  'Development',
  'Sales',
  'HR',
  'Finance',
  'Operations',
] as const

export const EMPLOYEE_DEPARTMENTS = [
  'Engineering',
  'Marketing',
  'Sales',
  'Human Resources',
  'Finance',
  'Operations',
  'Design',
] as const

export const EMPLOYEE_STATUSES = [
  EmployeeStatus.ACTIVE,
  EmployeeStatus.NOT_ACTIVE,
  EmployeeStatus.UNVERIFIED,
] as const

export const EMPLOYMENT_TYPES = [
  EmploymentType.FULLTIME,
  EmploymentType.PARTTIME,
  EmploymentType.CONTRACT,
  EmploymentType.INTERN,
] as const

export const MARITAL_STATUSES = [
  MaritalStatus.SINGLE,
  MaritalStatus.MARRIED,
  MaritalStatus.DIVORCED,
  MaritalStatus.WIDOWED,
] as const

export const GENDERS = [Gender.MALE, Gender.FEMALE, Gender.OTHER] as const

export const JOB_TITLES = [
  'Project Manager',
  'UI Designer',
  'UX Designer',
  'Digital Marketing Specialist',
  'Back End Developer',
  'Front End Developer',
  'Sales Manager',
  'Marketing Manager',
  'HR Manager',
  'Software Engineer',
  'Product Designer',
  'Data Analyst',
  'DevOps Engineer',
] as const

export const SKILLS = [
  'UI Design',
  'Communication',
  'Sketching',
  'Design Thinking',
  'React',
  'TypeScript',
  'Node.js',
  'Python',
  'Project Management',
  'Marketing Strategy',
  'Data Analysis',
  'Leadership',
  'Problem Solving',
] as const

export const LANGUAGES = [
  'English',
  'Vietnamese',
  'Chinese',
  'Japanese',
  'Korean',
  'French',
  'German',
  'Spanish',
] as const


