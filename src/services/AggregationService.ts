import { ProviderFactory, SupportedProvider } from '../providers/ProviderFactory';
import { CdeFile } from '../types/CdeFile';
import { mapBim360FileToCdeFile } from '../providers/mappers/bim360.mapper';
import { mapProcoreFileToCdeFile } from '../providers/mappers/procore.mapper';
import { resolveDuplicates } from '../utils/duplicateResolver';
import { config } from '../config'

export class AggregationService {
  public async getAggregatedFiles(
    providerNames: SupportedProvider[],
    projectId: string
  ): Promise<CdeFile[]> {
    const fetchPromises = providerNames.map(name => {
      const provider = ProviderFactory.create(name);
      const token = name === 'bim360' ? config.bim360Token : config.procoreToken;
      return provider.fetchFiles(projectId, token || '');
    });

    const results = await Promise.allSettled(fetchPromises);

    let allFiles: CdeFile[] = [];
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        const providerName = providerNames[index];
        const nativeFiles = result.value;
        const mappedFiles = nativeFiles.map(file => {
          if (providerName === 'bim360') {
            return mapBim360FileToCdeFile(file);
          }
          if (providerName === 'procore') {
            return mapProcoreFileToCdeFile(file);
          }
          return null;
        }).filter((file): file is CdeFile => file !== null);
        
        allFiles.push(...mappedFiles);
      } else {
        console.error(`Failed to fetch from ${providerNames[index]}:`, result.reason);
      }
    });
    const uniqueFiles = resolveDuplicates(allFiles);
    uniqueFiles.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    return uniqueFiles;
  }
}