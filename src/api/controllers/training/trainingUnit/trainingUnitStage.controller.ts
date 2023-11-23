import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';

import {
  createTrainingUnitStage,
  deleteTrainingUnitStage,
  getAndUpdateTrainingUnitStage,
  getTrainingUnitStage,
  getTrainingUnitStages,
} from '@services/training/trainingUnit/trainingUnitStage.service';

import {
  CreateTrainingUnitStageInput,
  DeleteTrainingUnitStageInput,
  GetTrainingUnitStageInput,
  UpdateTrainingUnitStageInput,
} from '@schemas/training/trainingUnit/trainingUnitStage.schema';

export async function createTrainingUnitStageController(
  req: Request<object, object, CreateTrainingUnitStageInput['body']>,
  res: Response,
  next: NextFunction
) {
  const userId = res.locals.user?._id;

  try {
    const trainingUnitStage = await createTrainingUnitStage({
      ...req.body,
      user: userId,
    });

    if (!trainingUnitStage) {
      const httpError = createHttpError(500, {
        message: 'A server error occurred during create trainingUnitStage',
      });
      return next(httpError);
    }

    return res.status(201).json(trainingUnitStage);
  } catch (e) {
    const httpError = createHttpError(400);
    return next(httpError);
  }
}

export async function updateTrainingUnitStageController(
  req: Request<
    UpdateTrainingUnitStageInput['params'],
    object,
    UpdateTrainingUnitStageInput['body']
  >,
  res: Response,
  next: NextFunction
) {
  try {
    const trainingUnitStageId = req.params.trainingUnitStageId;
    const update = req.body;

    const trainingUnitStage = await getTrainingUnitStage({
      _id: trainingUnitStageId,
    });

    if (!trainingUnitStage) {
      return res.sendStatus(404);
    }

    const updatedTrainingUnitStage = await getAndUpdateTrainingUnitStage(
      { _id: trainingUnitStageId },
      update,
      {
        new: true,
      }
    );

    return res.send(updatedTrainingUnitStage);
  } catch (e) {
    const httpError = createHttpError(404);
    return next(httpError);
  }
}

export async function getTrainingUnitStageController(
  req: Request<GetTrainingUnitStageInput['params']>,
  res: Response,
  next: NextFunction
) {
  const userId = res.locals.user?._id;
  try {
    const trainingUnitStageId = req.params.trainingUnitStageId;
    const trainingUnitStage = await getTrainingUnitStage({
      _id: trainingUnitStageId,
      user: userId,
    });

    if (!trainingUnitStage) {
      return res.sendStatus(404);
    }

    return res.send(trainingUnitStage);
  } catch (e) {
    const httpError = createHttpError(404);
    return next(httpError);
  }
}

export async function getTrainingUnitStagesController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = res.locals.user?._id;

  try {
    const trainingUnitStages = await getTrainingUnitStages({ user: userId });

    if (!trainingUnitStages) {
      return res.sendStatus(404);
    }

    return res.send(trainingUnitStages);
  } catch (e) {
    const httpError = createHttpError(404);
    return next(httpError);
  }
}

export async function deleteTrainingUnitStageController(
  req: Request<DeleteTrainingUnitStageInput['params']>,
  res: Response,
  next: NextFunction
) {
  const userId = res.locals.user?._id;

  try {
    const trainingUnitStageId = req.params.trainingUnitStageId;

    const trainingUnitStage = await getTrainingUnitStage({
      _id: trainingUnitStageId,
      user: userId,
    });

    if (!trainingUnitStage) {
      return res.sendStatus(404);
    }
    await deleteTrainingUnitStage({ _id: trainingUnitStageId });

    return res.sendStatus(200);
  } catch (e) {
    const httpError = createHttpError(404);
    return next(httpError);
  }
}
