import express from 'express';

//controllers
import {
  createExerciseController,
  getExercisesController,
  getExerciseController,
  deleteExerciseController,
  updateExerciseController,
} from '@controllers/exercise.controller';

//schema
import {
  createExerciseSchema,
  updateExerciseSchema,
  deleteExerciseSchema,
  getExerciseSchema,
} from '@schemas/exercise.schema';

//middleware
import requireUser from '@middleware/requireUser';
import { validateSchema } from '@middleware/validateSchema';

const router = express.Router();

router.post(
  '/',
  [requireUser, validateSchema(createExerciseSchema)],
  createExerciseController
);

router.get('/', requireUser, getExercisesController);

router.get(
  '/:exerciseId',
  [requireUser, validateSchema(getExerciseSchema)],
  getExerciseController
);

router.put(
  '/:exerciseId',
  [requireUser, validateSchema(updateExerciseSchema)],
  updateExerciseController
);

router.delete(
  '/:exerciseId',
  [requireUser, validateSchema(deleteExerciseSchema)],
  deleteExerciseController
);

export default router;
