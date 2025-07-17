import { mapBim360FileToCdeFile, Bim360NativeFile } from '@/providers/mappers/bim360.mapper';
import { mapProcoreFileToCdeFile, ProcoreNativeFile } from '@/providers/mappers/procore.mapper';

describe('Mapper Functions', () => {
  describe('BIM360 Mapper', () => {
    it('should correctly map a native BIM 360 file to the common CdeFile schema', () => {
      const nativeFile: Bim360NativeFile = {
        urn: 'file-urn-123',
        project_id: 'proj-bim-456',
        attributes: {
          displayName: 'TestFile.rvt',
          versionNumber: 3,
          lastModifiedTime: '2025-01-01T12:00:00Z',
        },
        storage: { size: 98765, url: 'http://download.bim360.com/file' },
      };

      const cdeFile = mapBim360FileToCdeFile(nativeFile);

      expect(cdeFile).toEqual({
        source: 'bim360',
        projectId: 'proj-bim-456',
        fileId: 'file-urn-123',
        name: 'TestFile.rvt',
        version: 'v3',
        size: 98765,
        downloadUrl: 'http://download.bim360.com/file',
        updatedAt: '2025-01-01T12:00:00Z',
      });
    });
  });

  describe('Procore Mapper', () => {
    it('should correctly map a native Procore file to the common CdeFile schema', () => {
      const nativeFile: ProcoreNativeFile = {
        id: 789,
        project_id: 111,
        name: 'Plan.pdf',
        current_revision: {
          id: 5,
          size: 12345,
          url: 'http://download.procore.com/file',
          updated_at: '2025-02-01T10:00:00Z',
        },
      };

      const cdeFile = mapProcoreFileToCdeFile(nativeFile);

      expect(cdeFile).toEqual({
        source: 'procore',
        projectId: '111',
        fileId: '789',
        name: 'Plan.pdf',
        version: 'rev5',
        size: 12345,
        downloadUrl: 'http://download.procore.com/file',
        updatedAt: '2025-02-01T10:00:00Z',
      });
    });
  });
});