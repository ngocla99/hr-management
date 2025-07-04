import { DashboardOverviewSchema } from '@/lib/validations/dashboard'
import apiClient from '../api-client'

export const getDashboardOverview = (): Promise<DashboardOverviewSchema> => {
  return apiClient.get('/dashboard/overview')
}
