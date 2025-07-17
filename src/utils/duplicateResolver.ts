import { CdeFile } from '../types/CdeFile';

/**
 * Resolves duplicates from a list of CdeFile objects.
 * A duplicate is defined by having the same 'projectId' and 'name'.
 * The file with the newest 'version' is kept. 
 *
 * @param files The array of CdeFile objects to de-duplicate.
 * @returns A new array with duplicates resolved.
 */
export function resolveDuplicates(files: CdeFile[]): CdeFile[] {
  const fileMap = new Map<string, CdeFile>();

  for (const file of files) {
    const key = `${file.projectId}|${file.name}`;
    const existingFile = fileMap.get(key);

    if (!existingFile || file.version > existingFile.version) {
      fileMap.set(key, file);
    }
  }

  return Array.from(fileMap.values());
}