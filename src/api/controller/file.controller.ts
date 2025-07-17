import { Request, Response, NextFunction } from 'express';
import { AggregationService } from '../../services/AggregationService';
import { SupportedProvider } from '../../providers/ProviderFactory';

export class FilesController {
  private aggregationService = new AggregationService();

  public getFiles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const providersQuery = req.query.providers as string;
      const projectId = req.query.project as string;

      if (!providersQuery || !projectId) {
        res.status(400).json({ error: 'Missing required query parameters: providers, project' });
        return;
      }

      const providerNames = providersQuery.split(',') as SupportedProvider[];
      
      const files = await this.aggregationService.getAggregatedFiles(providerNames, projectId);
      
      res.status(200).json(files);
    } catch (error) {
      next(error);
    }
  };
}