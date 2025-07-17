import { performance } from 'perf_hooks';
import { AggregationService } from '../src/services/AggregationService';
import { Bim360Provider } from '../src/providers/implementation/Bim360Provider';
import { ProcoreProvider } from '../src/providers/implementation/ProcoreProvider';
import { getMockBim360Files, getMockProcoreFiles } from '../tests/mocks/mockApiData';
import { ProviderFile } from '../src/providers/interface/ICDEProvider';

Bim360Provider.prototype.fetchFiles = async (projectId: string, token: string): Promise<ProviderFile[]> => {
  return getMockBim360Files(250);
};

ProcoreProvider.prototype.fetchFiles = async (projectId: string, token: string): Promise<ProviderFile[]> => {
  return getMockProcoreFiles(250);
};

async function runPerfTest() {
  console.log('Running performance test for 500 items...');

  const service = new AggregationService();
  const providers: any[] = ['bim360', 'procore'];
  const projectId = 'perf-test-project';

  const startTime = performance.now();

  // This service call will now use our mocked provider methods.
  const result = await service.getAggregatedFiles(providers, projectId);

  const endTime = performance.now();
  const duration = endTime - startTime;

  // The goal is to measure the time to process the 500 raw items.
  const rawItemCount = 250 + 250;

  console.log(`\n--- Performance Test Result ---`);
  console.log(`Input items processed: ${rawItemCount}`);
  console.log(`Unique items returned after de-duplication: ${result.length}`);
  console.log(`Execution time: ${duration.toFixed(2)} ms`);

  if (duration < 200) {
    console.log(`SUCCESS: Aggregation completed in under 200 ms.`);
  } else {
    console.log(`FAILURE: Aggregation took longer than the 200 ms target.`);
  }
}

runPerfTest();