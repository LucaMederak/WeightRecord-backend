import express from 'express';

//controllers
import {
  createTrainingUnitStageController,
  getTrainingUnitStagesController,
  getTrainingUnitStageController,
  deleteTrainingUnitStageController,
  updateTrainingUnitStageController,
} from '@controllers/training/trainingUnit/trainingUnitStage.controller';

//schema
import {
  createTrainingUnitStageSchema,
  updateTrainingUnitStageSchema,
  deleteTrainingUnitStageSchema,
  getTrainingUnitStageSchema,
} from '@schemas/training/trainingUnit/trainingUnitStage.schema';

//middleware
import requireUser from '@middleware/requireUser';
import { validateSchema } from '@middleware/validateSchema';

const router = express.Router();

router.post(
  '/',
  [requireUser, validateSchema(createTrainingUnitStageSchema)],
  createTrainingUnitStageController
);

router.get('/', requireUser, getTrainingUnitStagesController);

router.get(
  '/:trainingUnitStageId',
  [requireUser, validateSchema(getTrainingUnitStageSchema)],
  getTrainingUnitStageController
);

router.put(
  '/:trainingUnitStageId',
  [requireUser, validateSchema(updateTrainingUnitStageSchema)],
  updateTrainingUnitStageController
);

router.delete(
  '/:trainingUnitStageId',
  [requireUser, validateSchema(deleteTrainingUnitStageSchema)],
  deleteTrainingUnitStageController
);

export default router;
