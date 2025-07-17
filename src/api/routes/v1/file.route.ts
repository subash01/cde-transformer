import { Router } from 'express';
import { FilesController } from '../../controller/file.controller';

const router = Router();
const filesController = new FilesController();

/**
 * @description API End Point to Get Aggregated List Of CDE
 * @author R.Subash
 * @version 1.0
 */
router.get('/v1/files', filesController.getFiles);

export default router;