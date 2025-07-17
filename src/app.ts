import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import filesRouter from './api/routes/v1/file.route';
import { errorHandler } from './api/middleware/errorHandler';

const app = express();

// Middleware
app.use(express.json());

// API Documentation 
const swaggerDocument = YAML.load(path.join(__dirname, '../openapi.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use(filesRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.send('CDE Transformer is running. Visit /api-docs for documentation.');
});

// Error Handler
app.use(errorHandler);

export default app;