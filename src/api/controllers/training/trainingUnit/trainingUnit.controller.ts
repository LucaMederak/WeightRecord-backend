import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';

import {
  createTrainingUnit,
  deleteTrainingUnit,
  getAndUpdateTrainingUnit,
  getTrainingUnit,
  getTrainingUnits,
} from '@services/training/trainingUnit/trainingUnit.service';

import {
  CreateTrainingUnitInput,
  DeleteTrainingUnitInput,
  GetTrainingUnitInput,
  UpdateTrainingUnitInput,
} from '@schemas/training/trainingUnit/trainingUnit.schema';

export async function createTrainingUnitController(
  req: Request<object, object, CreateTrainingUnitInput['body']>,
  res: Response,
  next: NextFunction
) {
  const userId = res.locals.user?._id;

  try {
    const trainingUnit = await createTrainingUnit({
      ...req.body,
      user: userId,
    });

    if (!trainingUnit) {
      const httpError = createHttpError(500, {
        message: 'A server error occurred during create trainingUnit',
      });
      return next(httpError);
    }

    return res.status(201).json(trainingUnit);
  } catch (e) {
    const httpError = createHttpError(400);
    return next(httpError);
  }
}

export async function updateTrainingUnitController(
  req: Request<
    UpdateTrainingUnitInput['params'],
    object,
    UpdateTrainingUnitInput['body']
  >,
  res: Response,
  next: NextFunction
) {
  try {
    const trainingUnitId = req.params.trainingUnitId;
    const update = req.body;

    const trainingUnit = await getTrainingUnit({
      _id: trainingUnitId,
    });

    if (!trainingUnit) {
      return res.sendStatus(404);
    }

    const updatedTrainingUnit = await getAndUpdateTrainingUnit(
      { _id: trainingUnitId },
      update,
      {
        new: true,
      }
    );

    return res.send(updatedTrainingUnit);
  } catch (e) {
    const httpError = createHttpError(404);
    return next(httpError);
  }
}

export async function getTrainingUnitController(
  req: Request<GetTrainingUnitInput['params']>,
  res: Response,
  next: NextFunction
) {
  const userId = res.locals.user?._id;
  try {
    const trainingUnitId = req.params.trainingUnitId;
    const trainingUnit = await getTrainingUnit({
      _id: trainingUnitId,
      user: userId,
    });

    if (!trainingUnit) {
      return res.sendStatus(404);
    }

    return res.send(trainingUnit);
  } catch (e) {
    const httpError = createHttpError(404);
    return next(httpError);
  }
}

export async function getTrainingUnitsController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = res.locals.user?._id;

  try {
    const trainingUnits = await getTrainingUnits({ user: userId });

    if (!trainingUnits) {
      return res.sendStatus(404);
    }

    return res.send(trainingUnits);
  } catch (e) {
    const httpError = createHttpError(404);
    return next(httpError);
  }
}

export async function deleteTrainingUnitController(
  req: Request<DeleteTrainingUnitInput['params']>,
  res: Response,
  next: NextFunction
) {
  const userId = res.locals.user?._id;

  try {
    const trainingUnitId = req.params.trainingUnitId;

    const trainingUnit = await getTrainingUnit({
      _id: trainingUnitId,
      user: userId,
    });

    if (!trainingUnit) {
      return res.sendStatus(404);
    }
    await deleteTrainingUnit({ _id: trainingUnitId });

    return res.sendStatus(200);
  } catch (e) {
    const httpError = createHttpError(404);
    return next(httpError);
  }
}
