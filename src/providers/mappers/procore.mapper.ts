import { CdeFile } from '../../types/CdeFile';

// Stubbed native response from Procore API
export interface ProcoreNativeFile {
  id: number;
  project_id: number;
  name: string;
  current_revision: {
    id: number;
    url: string;
    size: number;
    updated_at: string;
  };
}

export function mapProcoreFileToCdeFile(nativeFile: ProcoreNativeFile): CdeFile {
  return {
    source: 'procore',
    projectId: nativeFile.project_id.toString(),
    fileId: nativeFile.id.toString(),
    name: nativeFile.name,
    version: `rev${nativeFile.current_revision.id}`,
    size: nativeFile.current_revision.size,
    downloadUrl: nativeFile.current_revision.url,
    updatedAt: nativeFile.current_revision.updated_at,
  };
}