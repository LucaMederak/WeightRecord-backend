import { Express } from 'express';
import { errorHandler } from '@middleware/errorHandler';
import userRoutes from './user.routes';
import sessionRoutes from './session.routes';
import clientRoutes from './client.routes';

const routes = (app: Express) => {
  app.get('/api/healthCheck', (req, res) => {
    res.sendStatus(200);
  });
  app.use('/api/user', userRoutes);
  app.use('/api/sessions', sessionRoutes);
  app.use('/api/clients', clientRoutes);
  app.use(errorHandler as any); //https://expressjs.com/en/guide/error-handling.html
};

export default routes;
