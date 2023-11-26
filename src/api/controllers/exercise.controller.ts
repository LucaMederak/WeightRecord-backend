import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';

import {
  createExercise,
  deleteExercise,
  getAndUpdateExercise,
  getExercise,
  getExercises,
} from '@services/exercise.service';

import {
  CreateExerciseInput,
  DeleteExerciseInput,
  GetExerciseInput,
  UpdateExerciseInput,
} from '@schemas/exercise.schema';

export async function createExerciseController(
  req: Request<object, object, CreateExerciseInput['body']>,
  res: Response,
  next: NextFunction
) {
  const userId = res.locals.user?._id;

  try {
    const exercise = await createExercise({
      ...req.body,
      user: userId,
    });

    return res.status(201).json(exercise);
  } catch (e) {
    return next(e);
  }
}

export async function updateExerciseController(
  req: Request<
    UpdateExerciseInput['params'],
    object,
    UpdateExerciseInput['body']
  >,
  res: Response,
  next: NextFunction
) {
  try {
    const exerciseId = req.params.exerciseId;
    const update = req.body;

    const exercise = await getExercise({
      _id: exerciseId,
    });

    if (!exercise) {
      return res.sendStatus(404);
    }

    const updatedExercise = await getAndUpdateExercise(
      { _id: exerciseId },
      update,
      {
        new: true,
      }
    );

    return res.send(updatedExercise);
  } catch (e) {
    const httpError = createHttpError(404);
    return next(httpError);
  }
}

export async function getExerciseController(
  req: Request<GetExerciseInput['params']>,
  res: Response,
  next: NextFunction
) {
  const userId = res.locals.user?._id;
  try {
    const exerciseId = req.params.exerciseId;
    const exercise = await getExercise({
      _id: exerciseId,
      user: userId,
    });

    if (!exercise) {
      return res.sendStatus(404);
    }

    return res.send(exercise);
  } catch (e) {
    const httpError = createHttpError(404);
    return next(httpError);
  }
}

export async function getExercisesController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = res.locals.user?._id;

  try {
    const exercises = await getExercises({ user: userId });

    if (!exercises) {
      return res.sendStatus(404);
    }

    return res.send(exercises);
  } catch (e) {
    const httpError = createHttpError(404);
    return next(httpError);
  }
}

export async function deleteExerciseController(
  req: Request<DeleteExerciseInput['params']>,
  res: Response,
  next: NextFunction
) {
  const userId = res.locals.user?._id;

  try {
    const exerciseId = req.params.exerciseId;

    const exercise = await getExercise({
      _id: exerciseId,
      user: userId,
    });

    if (!exercise) {
      return res.sendStatus(404);
    }
    await deleteExercise({ _id: exerciseId });

    return res.sendStatus(200);
  } catch (e) {
    const httpError = createHttpError(404);
    return next(httpError);
  }
}
