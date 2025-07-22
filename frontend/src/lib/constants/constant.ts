export const APP_CONSTANTS = {
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
  },

  SEARCH_PARAMS: {
    page: 1,
    limit: 10,
    sort: 'createdAt.desc',
  },
} as const

export const { PAGINATION, SEARCH_PARAMS } = APP_CONSTANTS
