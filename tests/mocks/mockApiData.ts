import { Bim360NativeFile } from "@/providers/mappers/bim360.mapper";
import { ProcoreNativeFile } from "@/providers/mappers/procore.mapper";

// Generates a mock BIM 360 file
export const getMockBim360Files = (count: number): Bim360NativeFile[] => {
  return Array.from({ length: count }, (_, i) => ({
    urn: `urn:adsk.wipprod:fs.file:vf.File${i}`,
    project_id: 'bim360-project-abc',
    attributes: {
      displayName: `BIM-File-${i % 50}.rvt`, // Create some duplicates
      versionNumber: i % 3 + 1,
      lastModifiedTime: new Date(Date.now() - i * 100000).toISOString(),
    },
    storage: {
      size: 100000 + i * 100,
      url: `https://bim360.com/download/File${i}`,
    },
  }));
};

// Generates a mock Procore file
export const getMockProcoreFiles = (count: number): ProcoreNativeFile[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: 1000 + i,
    project_id: 987,
    name: `PRO-Drawing-${i % 50}.pdf`, // Create some duplicates
    current_revision: {
      id: i % 3 + 1,
      size: 50000 + i * 50,
      url: `https://procore.com/download/${1000 + i}`,
      updated_at: new Date(Date.now() - i * 120000).toISOString(),
    }
  }));
};