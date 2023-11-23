import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';

import {
  createTrainingExerciseSeries,
  deleteTrainingExerciseSeries,
  getAndUpdateTrainingExerciseSeries,
  getTrainingExerciseSeries,
  getAllTrainingExerciseSeries,
} from '@services/training/trainingUnit/trainingExercise/trainingExerciseSeries.service';

import {
  CreateTrainingExerciseSeriesInput,
  DeleteTrainingExerciseSeriesInput,
  GetTrainingExerciseSeriesInput,
  UpdateTrainingExerciseSeriesInput,
} from '@schemas/training/trainingUnit/trainingExercise/trainingExerciseSeries.schema';

export async function createTrainingExerciseSeriesController(
  req: Request<object, object, CreateTrainingExerciseSeriesInput['body']>,
  res: Response,
  next: NextFunction
) {
  const userId = res.locals.user?._id;

  try {
    const trainingExerciseSeries = await createTrainingExerciseSeries({
      ...req.body,
      user: userId,
    });

    if (!trainingExerciseSeries) {
      const httpError = createHttpError(500, {
        message: 'A server error occurred during create trainingExerciseSeries',
      });
      return next(httpError);
    }

    return res.status(201).json(trainingExerciseSeries);
  } catch (e) {
    const httpError = createHttpError(400);
    return next(httpError);
  }
}

export async function updateTrainingExerciseSeriesController(
  req: Request<
    UpdateTrainingExerciseSeriesInput['params'],
    object,
    UpdateTrainingExerciseSeriesInput['body']
  >,
  res: Response,
  next: NextFunction
) {
  try {
    const trainingExerciseSeriesId = req.params.trainingExerciseSeriesId;
    const update = req.body;

    const trainingExerciseSeries = await getTrainingExerciseSeries({
      _id: trainingExerciseSeriesId,
    });

    if (!trainingExerciseSeries) {
      return res.sendStatus(404);
    }

    const updatedTrainingExerciseSeries =
      await getAndUpdateTrainingExerciseSeries(
        { _id: trainingExerciseSeriesId },
        update,
        {
          new: true,
        }
      );

    return res.send(updatedTrainingExerciseSeries);
  } catch (e) {
    const httpError = createHttpError(404);
    return next(httpError);
  }
}

export async function getTrainingExerciseSeriesController(
  req: Request<GetTrainingExerciseSeriesInput['params']>,
  res: Response,
  next: NextFunction
) {
  const userId = res.locals.user?._id;
  try {
    const trainingExerciseSeriesId = req.params.trainingExerciseSeriesId;
    const trainingExerciseSeries = await getTrainingExerciseSeries({
      _id: trainingExerciseSeriesId,
      user: userId,
    });

    if (!trainingExerciseSeries) {
      return res.sendStatus(404);
    }

    return res.send(trainingExerciseSeries);
  } catch (e) {
    const httpError = createHttpError(404);
    return next(httpError);
  }
}

export async function getAllTrainingExerciseSeriesController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = res.locals.user?._id;

  try {
    const allTrainingExerciseSeries = await getAllTrainingExerciseSeries({
      user: userId,
    });

    if (!allTrainingExerciseSeries) {
      return res.sendStatus(404);
    }

    return res.send(allTrainingExerciseSeries);
  } catch (e) {
    const httpError = createHttpError(404);
    return next(httpError);
  }
}

export async function deleteTrainingExerciseSeriesController(
  req: Request<DeleteTrainingExerciseSeriesInput['params']>,
  res: Response,
  next: NextFunction
) {
  const userId = res.locals.user?._id;

  try {
    const trainingExerciseSeriesId = req.params.trainingExerciseSeriesId;

    const trainingExerciseSeries = await getTrainingExerciseSeries({
      _id: trainingExerciseSeriesId,
      user: userId,
    });

    if (!trainingExerciseSeries) {
      return res.sendStatus(404);
    }
    await deleteTrainingExerciseSeries({ _id: trainingExerciseSeriesId });

    return res.sendStatus(200);
  } catch (e) {
    const httpError = createHttpError(404);
    return next(httpError);
  }
}
