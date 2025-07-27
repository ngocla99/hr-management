import { IconBriefcase, IconCalendar, IconUser } from '@tabler/icons-react'
import {
  Department,
  EmploymentStatus,
  EmploymentType,
  JobRole,
} from '@/types/api'
import { TFunction } from 'i18next'
import {
  BLOOD_TYPES,
  GENDERS,
  JOB_LEVELS,
  MARITAL_STATUSES,
} from './employee-constants'

export const employeeDepartmentOptionsFn = (t: TFunction) => [
  {
    label: t('department.qa', { ns: 'employee' }),
    value: Department.QA,
    icon: IconBriefcase,
  },
  {
    label: t('department.it', { ns: 'employee' }),
    value: Department.IT,
    icon: IconBriefcase,
  },
  {
    label: t('department.hr', { ns: 'employee' }),
    value: Department.HR,
    icon: IconBriefcase,
  },
  {
    label: t('department.finance', { ns: 'employee' }),
    value: Department.FINANCE,
    icon: IconBriefcase,
  },
  {
    label: t('department.marketing', { ns: 'employee' }),
    value: Department.MARKETING,
    icon: IconBriefcase,
  },
  {
    label: t('department.sales', { ns: 'employee' }),
    value: Department.SALES,
    icon: IconBriefcase,
  },
]

export const employmentTypeOptionsFn = (t: TFunction) => [
  {
    label: t('employmentType.fulltime', { ns: 'employee' }),
    value: EmploymentType.FULLTIME,
    icon: IconCalendar,
  },
  {
    label: t('employmentType.parttime', { ns: 'employee' }),
    value: EmploymentType.PARTTIME,
    icon: IconCalendar,
  },
  {
    label: t('employmentType.contract', { ns: 'employee' }),
    value: EmploymentType.CONTRACT,
    icon: IconCalendar,
  },
  {
    label: t('employmentType.intern', { ns: 'employee' }),
    value: EmploymentType.INTERN,
    icon: IconCalendar,
  },
  {
    label: t('employmentType.freelance', { ns: 'employee' }),
    value: EmploymentType.FREELANCE,
    icon: IconCalendar,
  },
]

export const employeeRoleOptionsFn = (t: TFunction) => [
  {
    label: t('role.fe_developer', { ns: 'employee' }),
    value: JobRole.FE_DEVELOPER,
    icon: IconUser,
  },
  {
    label: t('role.be_developer', { ns: 'employee' }),
    value: JobRole.BE_DEVELOPER,
    icon: IconUser,
  },
  {
    label: t('role.fullstack_developer', { ns: 'employee' }),
    value: JobRole.FULLSTACK_DEVELOPER,
    icon: IconUser,
  },
  {
    label: t('role.mobile_developer', { ns: 'employee' }),
    value: JobRole.MOBILE_DEVELOPER,
    icon: IconUser,
  },
  {
    label: t('role.qa', { ns: 'employee' }),
    value: JobRole.QA,
    icon: IconUser,
  },
  {
    label: t('role.hr', { ns: 'employee' }),
    value: JobRole.HR,
    icon: IconUser,
  },
  {
    label: t('role.designer', { ns: 'employee' }),
    value: JobRole.DESIGNER,
    icon: IconUser,
  },
  {
    label: t('role.accountant', { ns: 'employee' }),
    value: JobRole.ACCOUNTANT,
    icon: IconUser,
  },
]

export const employmentStatusOptionsFn = (t: TFunction) => [
  {
    label: t('employmentStatus.active', { ns: 'employee' }),
    value: EmploymentStatus.ACTIVE,
    icon: IconUser,
  },
  {
    label: t('employmentStatus.terminated', { ns: 'employee' }),
    value: EmploymentStatus.TERMINATED,
    icon: IconUser,
  },
  {
    label: t('employmentStatus.probation', { ns: 'employee' }),
    value: EmploymentStatus.PROBATION,
    icon: IconUser,
  },
  {
    label: t('employmentStatus.on_leave', { ns: 'employee' }),
    value: EmploymentStatus.ON_LEAVE,
    icon: IconUser,
  },
]

export const genderOptionsFn = (t: TFunction) =>
  GENDERS.map((gender) => ({
    value: gender,
    label: t(`gender.${gender}`, { ns: 'users' } as any),
  }))

export const maritalStatusOptionsFn = (t: TFunction) =>
  MARITAL_STATUSES.map((status) => ({
    value: status,
    label: t(`maritalStatus.${status}`, { ns: 'users' } as any),
  }))

export const bloodTypeOptionsFn = (t: TFunction) =>
  BLOOD_TYPES.map((type) => ({
    value: type,
    label: type,
  }))

export const jobLevelOptionsFn = (t: TFunction) =>
  JOB_LEVELS.map((level) => ({
    value: level,
    label: t(`level.${level}`, { ns: 'employee' } as any),
  }))
