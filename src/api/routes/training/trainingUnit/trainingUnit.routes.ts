import express from 'express';

//controllers
import {
  createTrainingUnitController,
  getTrainingUnitsController,
  getTrainingUnitController,
  deleteTrainingUnitController,
  updateTrainingUnitController,
} from '@controllers/training/trainingUnit/trainingUnit.controller';

//schema
import {
  createTrainingUnitSchema,
  updateTrainingUnitSchema,
  deleteTrainingUnitSchema,
  getTrainingUnitSchema,
} from '@schemas/training/trainingUnit/trainingUnit.schema';

//middleware
import requireUser from '@middleware/requireUser';
import { validateSchema } from '@middleware/validateSchema';

const router = express.Router();

router.post(
  '/',
  [requireUser, validateSchema(createTrainingUnitSchema)],
  createTrainingUnitController
);

router.get('/', requireUser, getTrainingUnitsController);

router.get(
  '/:trainingUnitId',
  [requireUser, validateSchema(getTrainingUnitSchema)],
  getTrainingUnitController
);

router.put(
  '/:trainingUnitId',
  [requireUser, validateSchema(updateTrainingUnitSchema)],
  updateTrainingUnitController
);

router.delete(
  '/:trainingUnitId',
  [requireUser, validateSchema(deleteTrainingUnitSchema)],
  deleteTrainingUnitController
);

export default router;
