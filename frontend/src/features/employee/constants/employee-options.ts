import { IconBriefcase, IconCalendar, IconUser } from '@tabler/icons-react'
import { Department, JobRole } from '@/types/api'
import { TFunction } from 'i18next'
import { EmploymentType } from '../types/employee.types'

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
    label: t('role.feDeveloper', { ns: 'employee' }),
    value: JobRole.FE_DEVELOPER,
    icon: IconUser,
  },
  {
    label: t('role.beDeveloper', { ns: 'employee' }),
    value: JobRole.BE_DEVELOPER,
    icon: IconUser,
  },
  {
    label: t('role.mobileDeveloper', { ns: 'employee' }),
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
]
