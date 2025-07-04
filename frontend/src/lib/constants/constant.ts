export const APP_CONSTANTS = {
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
  },

  QUERY_KEYS: {
    DASHBOARD: 'dashboard',
    USERS: 'users',
    TASKS: 'tasks',
    PROJECTS: 'projects',
    AUTH: 'auth',
  },
} as const

export const { PAGINATION, QUERY_KEYS } = APP_CONSTANTS
