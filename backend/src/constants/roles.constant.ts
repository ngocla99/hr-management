// User roles enum
export enum UserRole {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  HR_MANAGER = "hr_manager",
  RECRUITER = "recruiter",
  HIRING_MANAGER = "hiring_manager",
  EMPLOYEE = "employee",
}

// Permissions enum
export enum Permission {
  // User management
  CREATE_USER = "create_user",
  READ_USER = "read_user",
  UPDATE_USER = "update_user",
  DELETE_USER = "delete_user",

  // Role management
  MANAGE_ROLES = "manage_roles",
  ASSIGN_ROLES = "assign_roles",

  // Job management
  CREATE_JOB = "create_job",
  READ_JOB = "read_job",
  UPDATE_JOB = "update_job",
  DELETE_JOB = "delete_job",
  PUBLISH_JOB = "publish_job",

  // Candidate management
  CREATE_CANDIDATE = "create_candidate",
  READ_CANDIDATE = "read_candidate",
  UPDATE_CANDIDATE = "update_candidate",
  DELETE_CANDIDATE = "delete_candidate",

  // Application management
  VIEW_APPLICATIONS = "view_applications",
  MANAGE_APPLICATIONS = "manage_applications",

  // Interview management
  SCHEDULE_INTERVIEW = "schedule_interview",
  CONDUCT_INTERVIEW = "conduct_interview",

  // Department management
  CREATE_DEPARTMENT = "create_department",
  READ_DEPARTMENT = "read_department",
  UPDATE_DEPARTMENT = "update_department",
  DELETE_DEPARTMENT = "delete_department",

  // Employee management
  CREATE_EMPLOYEE = "create_employee",
  READ_EMPLOYEE = "read_employee",
  UPDATE_EMPLOYEE = "update_employee",
  DELETE_EMPLOYEE = "delete_employee",

  // File management
  UPLOAD_FILE = "upload_file",
  READ_FILE = "read_file",
  DELETE_FILE = "delete_file",

  // Reports and analytics
  VIEW_REPORTS = "view_reports",
  EXPORT_DATA = "export_data",
}

// Role-Permission mapping
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.SUPER_ADMIN]: [
    // Full access to everything
    ...Object.values(Permission),
  ],

  [UserRole.ADMIN]: [
    // User management
    Permission.CREATE_USER,
    Permission.READ_USER,
    Permission.UPDATE_USER,
    Permission.DELETE_USER,
    Permission.ASSIGN_ROLES,

    // Department management
    Permission.CREATE_DEPARTMENT,
    Permission.READ_DEPARTMENT,
    Permission.UPDATE_DEPARTMENT,
    Permission.DELETE_DEPARTMENT,

    // Employee management
    Permission.CREATE_EMPLOYEE,
    Permission.READ_EMPLOYEE,
    Permission.UPDATE_EMPLOYEE,
    Permission.DELETE_EMPLOYEE,

    // File management
    Permission.UPLOAD_FILE,
    Permission.READ_FILE,
    Permission.DELETE_FILE,

    // Reports
    Permission.VIEW_REPORTS,
    Permission.EXPORT_DATA,
  ],

  [UserRole.HR_MANAGER]: [
    // User management (limited)
    Permission.CREATE_USER,
    Permission.READ_USER,
    Permission.UPDATE_USER,

    // Job management
    Permission.CREATE_JOB,
    Permission.READ_JOB,
    Permission.UPDATE_JOB,
    Permission.DELETE_JOB,
    Permission.PUBLISH_JOB,

    // Candidate management
    Permission.CREATE_CANDIDATE,
    Permission.READ_CANDIDATE,
    Permission.UPDATE_CANDIDATE,
    Permission.DELETE_CANDIDATE,

    // Application management
    Permission.VIEW_APPLICATIONS,
    Permission.MANAGE_APPLICATIONS,

    // Interview management
    Permission.SCHEDULE_INTERVIEW,
    Permission.CONDUCT_INTERVIEW,

    // Employee management
    Permission.CREATE_EMPLOYEE,
    Permission.READ_EMPLOYEE,
    Permission.UPDATE_EMPLOYEE,

    // File management
    Permission.UPLOAD_FILE,
    Permission.READ_FILE,
    Permission.DELETE_FILE,

    // Reports
    Permission.VIEW_REPORTS,
    Permission.EXPORT_DATA,
  ],

  [UserRole.RECRUITER]: [
    // Job management
    Permission.CREATE_JOB,
    Permission.READ_JOB,
    Permission.UPDATE_JOB,
    Permission.PUBLISH_JOB,

    // Candidate management
    Permission.CREATE_CANDIDATE,
    Permission.READ_CANDIDATE,
    Permission.UPDATE_CANDIDATE,

    // Application management
    Permission.VIEW_APPLICATIONS,
    Permission.MANAGE_APPLICATIONS,

    // Interview management
    Permission.SCHEDULE_INTERVIEW,

    // File management
    Permission.UPLOAD_FILE,
    Permission.READ_FILE,

    // Limited reports
    Permission.VIEW_REPORTS,
  ],

  [UserRole.HIRING_MANAGER]: [
    // Job management (own jobs)
    Permission.READ_JOB,
    Permission.UPDATE_JOB,

    // Candidate management (for own jobs)
    Permission.READ_CANDIDATE,
    Permission.UPDATE_CANDIDATE,

    // Application management
    Permission.VIEW_APPLICATIONS,
    Permission.MANAGE_APPLICATIONS,

    // Interview management
    Permission.SCHEDULE_INTERVIEW,
    Permission.CONDUCT_INTERVIEW,

    // File management
    Permission.UPLOAD_FILE,
    Permission.READ_FILE,

    // Employee info (read-only)
    Permission.READ_EMPLOYEE,
  ],

  [UserRole.EMPLOYEE]: [
    // Basic file access
    Permission.UPLOAD_FILE,
    Permission.READ_FILE,

    // Own profile
    Permission.READ_USER,

    // Basic employee info
    Permission.READ_EMPLOYEE,
    Permission.READ_DEPARTMENT,
  ],
};

// Helper function to check if a role has a specific permission
export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}

// Helper function to get all permissions for a role
export function getRolePermissions(role: UserRole): Permission[] {
  return ROLE_PERMISSIONS[role];
}

// Role hierarchy for permission inheritance
export const ROLE_HIERARCHY: Record<UserRole, UserRole[]> = {
  [UserRole.SUPER_ADMIN]: [
    UserRole.ADMIN,
    UserRole.HR_MANAGER,
    UserRole.RECRUITER,
    UserRole.HIRING_MANAGER,
    UserRole.EMPLOYEE,
  ],
  [UserRole.ADMIN]: [
    UserRole.HR_MANAGER,
    UserRole.RECRUITER,
    UserRole.HIRING_MANAGER,
    UserRole.EMPLOYEE,
  ],
  [UserRole.HR_MANAGER]: [UserRole.RECRUITER, UserRole.HIRING_MANAGER, UserRole.EMPLOYEE],
  [UserRole.RECRUITER]: [UserRole.EMPLOYEE],
  [UserRole.HIRING_MANAGER]: [UserRole.EMPLOYEE],
  [UserRole.EMPLOYEE]: [],
};

// Helper function to check if a role has higher or equal privilege than another
export function hasHigherOrEqualRole(userRole: UserRole, targetRole: UserRole): boolean {
  if (userRole === targetRole) return true;
  return ROLE_HIERARCHY[userRole].includes(targetRole);
}
