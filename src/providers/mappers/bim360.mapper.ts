import { CdeFile } from '../../types/CdeFile';

// Stubbed native response from Autodesk BIM 360 API
export interface Bim360NativeFile {
  urn: string;
  project_id: string;
  attributes: {
    displayName: string;
    versionNumber: number;
    lastModifiedTime: string;
  };
  storage: {
    size: number;
    url: string;
  };
}

export function mapBim360FileToCdeFile(nativeFile: Bim360NativeFile): CdeFile {
  return {
    source: 'bim360',
    projectId: nativeFile.project_id,
    fileId: nativeFile.urn,
    name: nativeFile.attributes.displayName,
    version: `v${nativeFile.attributes.versionNumber}`,
    size: nativeFile.storage.size,
    downloadUrl: nativeFile.storage.url,
    updatedAt: nativeFile.attributes.lastModifiedTime,
  };
}