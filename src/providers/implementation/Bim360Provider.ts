import { ICDEProvider, ProviderFile } from '../interface/ICDEProvider';
import { getMockBim360Files } from '../../../tests/mocks/mockApiData';

export class Bim360Provider implements ICDEProvider {
  public async fetchFiles(projectId: string, token: string): Promise<ProviderFile[]> {
    console.log(`Fetching files for BIM 360 project: ${projectId} with token: ${token.substring(0, 10)}...`);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 50));
    return getMockBim360Files(250);
  }
}