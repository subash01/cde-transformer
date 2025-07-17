import { ICDEProvider, ProviderFile } from '../interface/ICDEProvider';
export class StubProvider implements ICDEProvider {
  constructor(private providerName: string) {}

  public async fetchFiles(projectId: string, token: string): Promise<ProviderFile[]> {
    console.log(`(STUB) Fetching files for ${this.providerName} project: ${projectId}`);
    return [];
  }
}