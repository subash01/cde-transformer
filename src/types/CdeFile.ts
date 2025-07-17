export interface CdeFile {
  source: 'bim360' | 'procore' | 'viewpoint' | 'trimble' | 'aconex';
  projectId: string;
  fileId: string;
  name: string;
  version: string;
  size: number; 
  downloadUrl: string; 
  updatedAt: string;
}