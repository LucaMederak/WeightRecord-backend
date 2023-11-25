import express from 'express';

//controllers
import {
  createTrainingPlanController,
  getTrainingPlansController,
  getTrainingPlanController,
  deleteTrainingPlanController,
  updateTrainingPlanController,
  createTrainingPlanWithTrainingUnitController,
} from '@controllers/training/trainingPlan.controller';

//schema
import {
  createTrainingPlanSchema,
  updateTrainingPlanSchema,
  deleteTrainingPlanSchema,
  getTrainingPlanSchema,
} from '@schemas/training/trainingPlan.schema';

//middleware
import requireUser from '@middleware/requireUser';
import { validateSchema } from '@middleware/validateSchema';

const router = express.Router();

router.post(
  '/unit',
  [requireUser, validateSchema(createTrainingPlanSchema)],
  createTrainingPlanWithTrainingUnitController
);

router.post(
  '/',
  [requireUser, validateSchema(createTrainingPlanSchema)],
  createTrainingPlanController
);

router.get('/', requireUser, getTrainingPlansController);

router.get(
  '/:trainingPlanId',
  [requireUser, validateSchema(getTrainingPlanSchema)],
  getTrainingPlanController
);

router.put(
  '/:trainingPlanId',
  [requireUser, validateSchema(updateTrainingPlanSchema)],
  updateTrainingPlanController
);

router.delete(
  '/:trainingPlanId',
  [requireUser, validateSchema(deleteTrainingPlanSchema)],
  deleteTrainingPlanController
);

export default router;
