import express from 'express';

//controllers
import {
  createTrainingExerciseSeriesController,
  getAllTrainingExerciseSeriesController,
  getTrainingExerciseSeriesController,
  deleteTrainingExerciseSeriesController,
  updateTrainingExerciseSeriesController,
} from '@controllers/training/trainingUnit/trainingExercise/trainingExerciseSeries.controller';

//schema
import {
  createTrainingExerciseSeriesSchema,
  updateTrainingExerciseSeriesSchema,
  deleteTrainingExerciseSeriesSchema,
  getTrainingExerciseSeriesSchema,
} from '@schemas/training/trainingUnit/trainingExercise/trainingExerciseSeries.schema';

//middleware
import requireUser from '@middleware/requireUser';
import { validateSchema } from '@middleware/validateSchema';

const router = express.Router();

router.post(
  '/',
  [requireUser, validateSchema(createTrainingExerciseSeriesSchema)],
  createTrainingExerciseSeriesController
);

router.get('/', requireUser, getAllTrainingExerciseSeriesController);

router.get(
  '/:trainingExerciseSeriesId',
  [requireUser, validateSchema(getTrainingExerciseSeriesSchema)],
  getTrainingExerciseSeriesController
);

router.put(
  '/:trainingExerciseSeriesId',
  [requireUser, validateSchema(updateTrainingExerciseSeriesSchema)],
  updateTrainingExerciseSeriesController
);

router.delete(
  '/:trainingExerciseSeriesId',
  [requireUser, validateSchema(deleteTrainingExerciseSeriesSchema)],
  deleteTrainingExerciseSeriesController
);

export default router;
