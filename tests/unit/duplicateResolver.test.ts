import { resolveDuplicates } from '@/utils/duplicateResolver';
import { CdeFile } from '@/types/CdeFile';

describe('Duplicate Resolver', () => {
  it('should return an empty array if given an empty array', () => {
    expect(resolveDuplicates([])).toEqual([]);
  });

  it('should return the same array if there are no duplicates', () => {
    const files: CdeFile[] = [
      { source: 'bim360', projectId: 'p1', fileId: 'f1', name: 'FileA', version: 'v1', size: 1, downloadUrl: '', updatedAt: '' },
      { source: 'procore', projectId: 'p1', fileId: 'f2', name: 'FileB', version: 'v1', size: 1, downloadUrl: '', updatedAt: '' },
    ];
    expect(resolveDuplicates(files)).toHaveLength(2);
  });

  it('should keep the file with the highest version for each duplicate', () => {
    const files: CdeFile[] = [
      { source: 'bim360', projectId: 'p1', fileId: 'f1', name: 'FileA', version: 'v1', size: 1, downloadUrl: '', updatedAt: '' },
      { source: 'bim360', projectId: 'p1', fileId: 'f2', name: 'FileA', version: 'v3', size: 1, downloadUrl: '', updatedAt: '' }, // Keep this one
      { source: 'bim360', projectId: 'p1', fileId: 'f3', name: 'FileA', version: 'v2', size: 1, downloadUrl: '', updatedAt: '' },
    ];
    const result = resolveDuplicates(files);
    expect(result).toHaveLength(1);
    expect(result[0].version).toBe('v3');
  });

  it('should handle duplicates across different sources correctly', () => {
    const files: CdeFile[] = [
      { source: 'bim360', projectId: 'p1', fileId: 'f1', name: 'FileA', version: 'v1', size: 1, downloadUrl: '', updatedAt: '' },
      { source: 'procore', projectId: 'p1', fileId: 'f2', name: 'FileA', version: 'v2', size: 1, downloadUrl: '', updatedAt: '' }, // Keep this one
    ];
    const result = resolveDuplicates(files);
    expect(result).toHaveLength(1);
    expect(result[0].version).toBe('v2');
    expect(result[0].source).toBe('procore');
  });
});