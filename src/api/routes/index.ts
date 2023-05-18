import { Express } from 'express';
import { errorHandler } from '@middleware/errorHandler';
import userRoutes from './user.routes';
import sessionRoutes from './session.routes';
import clientRoutes from './client.routes';
import measurementRoutes from './measurement.routes';

const routes = (app: Express) => {
  app.get('/api/healthCheck', (req, res) => {
    res.sendStatus(200);
  });
  app.use('/api/user', userRoutes);
  app.use('/api/sessions', sessionRoutes);
  app.use('/api/clients', clientRoutes);
  app.use('/api/measurements', measurementRoutes);
  app.use(errorHandler as any);
};

export default routes;
