import { CdeFile } from '../../types/CdeFile';
export type ProviderFile = any;

/**
 * Defines the contract for a CDE provider.
 * Each provider must be able to fetch files and return them in its native format.
 */
export interface ICDEProvider {
  /**
   * Fetches the latest files or drawings for a given project.
   * @param projectId The unique identifier for the project within the CDE.
   * @param token The authentication token for the CDE's API.
   * @returns A promise that resolves to an array of provider-specific file objects.
   */
  fetchFiles(projectId: string, token: string): Promise<ProviderFile[]>;
}