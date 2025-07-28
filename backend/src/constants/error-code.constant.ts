export enum ErrorCode {
  // Common Validation
  V000 = "common.validation.error",
  V001 = "common.validation.is_empty",
  V002 = "common.validation.is_invalid",

  // User
  U001 = "user.error.username_or_email_exists",
  U002 = "user.error.not_found",
  U003 = "user.error.email_exists",
  U004 = "user.error.username_exists",

  // Department
  D001 = "department.error.name_exists",
  D002 = "department.error.manager_not_found",
  D003 = "department.error.parent_department_not_found",
  D004 = "department.error.self_reference",
  D005 = "department.error.has_child_departments",
  D006 = "department.error.has_active_teams",
  D007 = "department.error.not_found",
  D008 = "department.error.root_department_exists",

  // Team
  T001 = "team.error.name_exists",
  T002 = "team.error.team_lead_not_found",
  T003 = "team.error.department_not_found",
  T004 = "team.error.not_found",
  T005 = "team.error.has_members",
  T006 = "team.error.has_active_members",

  // Employee
  E001 = "employee.error.employee_number_exists",
  E002 = "employee.error.user_already_employee",
  E003 = "employee.error.not_found",
  E004 = "employee.error.employee_number_not_found",
  E005 = "employee.error.hire_date_in_the_future",
  E006 = "employee.error.termination_date_before_hire_date",
  E007 = "employee.error.salary_less_than_zero",
  E008 = "employee.error.work_schedule_invalid",
  E009 = "employee.error.document_type_invalid",
  E010 = "employee.error.document_expiry_date_in_the_past",
  E011 = "employee.error.first_name_or_last_name_required",

  // Time Management
  TM001 = "time_management.error.already_clocked_in",
  TM002 = "time_management.error.already_clocked_out",
  TM003 = "time_management.error.clock_in_time_invalid",
  TM004 = "time_management.error.clock_out_time_invalid",
  TM005 = "time_management.error.attendance_not_found",
  TM006 = "time_management.error.attendance_already_exists",
  TM007 = "time_management.error.time_off_date_invalid",
  TM008 = "time_management.error.time_off_date_in_the_past",
  TM009 = "time_management.error.time_off_not_found",
  TM010 = "time_management.error.time_off_not_pending",
}
