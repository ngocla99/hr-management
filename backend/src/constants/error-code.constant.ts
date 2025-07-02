export enum ErrorCode {
  // Common Validation
  V000 = "common.validation.error",
  V001 = "common.validation.is_empty",
  V002 = "common.validation.is_invalid",

  // User
  U001 = "user.error.username_or_email_exists",
  U002 = "user.error.not_found",
  U003 = "user.error.email_exists",

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
}
