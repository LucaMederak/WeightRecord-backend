import express from 'express';

//controllers
import {
  createTrainingExerciseController,
  getTrainingExercisesController,
  getTrainingExerciseController,
  deleteTrainingExerciseController,
  updateTrainingExerciseController,
} from '@controllers/training/trainingUnit/trainingExercise/trainingExercise.controller';

//schema
import {
  createTrainingExerciseSchema,
  updateTrainingExerciseSchema,
  deleteTrainingExerciseSchema,
  getTrainingExerciseSchema,
} from '@schemas/training/trainingUnit/trainingExercise/trainingExercise.schema';

//middleware
import requireUser from '@middleware/requireUser';
import { validateSchema } from '@middleware/validateSchema';

const router = express.Router();

router.post(
  '/',
  [requireUser, validateSchema(createTrainingExerciseSchema)],
  createTrainingExerciseController
);

router.get('/', requireUser, getTrainingExercisesController);

router.get(
  '/:trainingExerciseId',
  [requireUser, validateSchema(getTrainingExerciseSchema)],
  getTrainingExerciseController
);

router.put(
  '/:trainingExerciseId',
  [requireUser, validateSchema(updateTrainingExerciseSchema)],
  updateTrainingExerciseController
);

router.delete(
  '/:trainingExerciseId',
  [requireUser, validateSchema(deleteTrainingExerciseSchema)],
  deleteTrainingExerciseController
);

export default router;
