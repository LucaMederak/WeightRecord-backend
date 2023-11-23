import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';

import {
  createTrainingExercise,
  deleteTrainingExercise,
  getAndUpdateTrainingExercise,
  getTrainingExercise,
  getTrainingExercises,
} from '@services/training/trainingUnit/trainingExercise/trainingExercise.service';

import {
  CreateTrainingExerciseInput,
  DeleteTrainingExerciseInput,
  GetTrainingExerciseInput,
  UpdateTrainingExerciseInput,
} from '@schemas/training/trainingUnit/trainingExercise/trainingExercise.schema';

export async function createTrainingExerciseController(
  req: Request<object, object, CreateTrainingExerciseInput['body']>,
  res: Response,
  next: NextFunction
) {
  const userId = res.locals.user?._id;

  try {
    const trainingExercise = await createTrainingExercise({
      ...req.body,
      user: userId,
    });

    if (!trainingExercise) {
      const httpError = createHttpError(500, {
        message: 'A server error occurred during create trainingExercise',
      });
      return next(httpError);
    }

    return res.status(201).json(trainingExercise);
  } catch (e) {
    const httpError = createHttpError(400);
    return next(httpError);
  }
}

export async function updateTrainingExerciseController(
  req: Request<
    UpdateTrainingExerciseInput['params'],
    object,
    UpdateTrainingExerciseInput['body']
  >,
  res: Response,
  next: NextFunction
) {
  try {
    const trainingExerciseId = req.params.trainingExerciseId;
    const update = req.body;

    const trainingExercise = await getTrainingExercise({
      _id: trainingExerciseId,
    });

    if (!trainingExercise) {
      return res.sendStatus(404);
    }

    const updatedTrainingExercise = await getAndUpdateTrainingExercise(
      { _id: trainingExerciseId },
      update,
      {
        new: true,
      }
    );

    return res.send(updatedTrainingExercise);
  } catch (e) {
    const httpError = createHttpError(404);
    return next(httpError);
  }
}

export async function getTrainingExerciseController(
  req: Request<GetTrainingExerciseInput['params']>,
  res: Response,
  next: NextFunction
) {
  const userId = res.locals.user?._id;
  try {
    const trainingExerciseId = req.params.trainingExerciseId;
    const trainingExercise = await getTrainingExercise({
      _id: trainingExerciseId,
      user: userId,
    });

    if (!trainingExercise) {
      return res.sendStatus(404);
    }

    return res.send(trainingExercise);
  } catch (e) {
    const httpError = createHttpError(404);
    return next(httpError);
  }
}

export async function getTrainingExercisesController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = res.locals.user?._id;

  try {
    const trainingExercises = await getTrainingExercises({ user: userId });

    if (!trainingExercises) {
      return res.sendStatus(404);
    }

    return res.send(trainingExercises);
  } catch (e) {
    const httpError = createHttpError(404);
    return next(httpError);
  }
}

export async function deleteTrainingExerciseController(
  req: Request<DeleteTrainingExerciseInput['params']>,
  res: Response,
  next: NextFunction
) {
  const userId = res.locals.user?._id;

  try {
    const trainingExerciseId = req.params.trainingExerciseId;

    const trainingExercise = await getTrainingExercise({
      _id: trainingExerciseId,
      user: userId,
    });

    if (!trainingExercise) {
      return res.sendStatus(404);
    }
    await deleteTrainingExercise({ _id: trainingExerciseId });

    return res.sendStatus(200);
  } catch (e) {
    const httpError = createHttpError(404);
    return next(httpError);
  }
}
