import { ProjectSchema } from '@/lib/validations/project'
import { Project } from '../data/schema'

/**
 * Transforms API project data to local Project format
 * @param apiProject - Project data from API
 * @returns Transformed project data for local use
 */
export const adaptApiProjectToLocalProject = (
  apiProject: ProjectSchema
): Project => {
  return {
    id: apiProject.id,
    name: apiProject.name,
    description: apiProject.description,
    status: 'active', // Default status since not available in API
    priority: 'Medium', // Default priority since not available in API
    createdAt: apiProject.createdAt,
    updatedAt: apiProject.updatedAt,
  }
}

/**
 * Transforms multiple API projects to local format
 * @param apiProjects - Array of projects from API
 * @returns Array of transformed projects for local use
 */
export const adaptApiProjectsToLocalProjects = (
  apiProjects: ProjectSchema[]
): Project[] => {
  if (!apiProjects || apiProjects.length === 0) {
    return []
  }
  
  return apiProjects.map(adaptApiProjectToLocalProject)
}
