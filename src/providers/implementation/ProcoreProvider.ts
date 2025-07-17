import { ICDEProvider, ProviderFile } from '../interface/ICDEProvider';
import { getMockProcoreFiles } from '../../../tests/mocks/mockApiData';

export class ProcoreProvider implements ICDEProvider {
  public async fetchFiles(projectId: string, token: string): Promise<ProviderFile[]> {
    console.log(`Fetching files for Procore project: ${projectId} with token: ${token.substring(0, 10)}...`);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 60));
    return getMockProcoreFiles(250);
  }
}