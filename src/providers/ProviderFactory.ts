import { ICDEProvider } from './interface/ICDEProvider';
import { Bim360Provider } from './implementation/Bim360Provider';
import { ProcoreProvider } from './implementation/ProcoreProvider';
import { StubProvider } from './implementation/StubProvider';
import { CdeFile } from '../types/CdeFile';

export type SupportedProvider = CdeFile['source'];

export class ProviderFactory {
  static create(providerName: SupportedProvider): ICDEProvider {
    switch (providerName) {
      case 'bim360':
        return new Bim360Provider();
      case 'procore':
        return new ProcoreProvider();
      default:
        throw new Error(`Unsupported provider: ${providerName}`);
    }
  }
}