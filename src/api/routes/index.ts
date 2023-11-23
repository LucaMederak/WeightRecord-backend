import { Express } from 'express';
import { errorHandler } from '@middleware/errorHandler';
import userRoutes from './user.routes';
import sessionRoutes from './session.routes';
import clientRoutes from './client.routes';
import measurementRoutes from './measurement.routes';
import exerciseRoutes from './exercise.routes';
import traingPlanRoutes from './training/trainingPlan.routes';
import trainigUnitRoutes from './training/trainingUnit/trainingUnit.routes';
import trainigUnitStageRoutes from './training/trainingUnit/trainingUnitStage.routes';
import trainigExerciseRoutes from './training/trainingUnit/trainingExercise/trainingExercise.routes';
import trainigExerciseSeriesRoutes from './training/trainingUnit/trainingExercise/trainingExerciseSeries.routes';

const routes = (app: Express) => {
  app.get('/api/healthCheck', (req, res) => {
    res.sendStatus(200);
  });
  app.use('/api/user', userRoutes);
  app.use('/api/sessions', sessionRoutes);
  app.use('/api/clients', clientRoutes);
  app.use('/api/measurements', measurementRoutes);
  app.use('/api/exercises', exerciseRoutes);
  app.use('/api/training-plans', traingPlanRoutes);
  app.use('/api/training-units', trainigUnitRoutes);
  app.use('/api/training-unit-stages', trainigUnitStageRoutes);
  app.use('/api/training-exercises', trainigExerciseRoutes);
  app.use('/api/training-exercise-series', trainigExerciseSeriesRoutes);
  app.use(errorHandler as any);
};

export default routes;
