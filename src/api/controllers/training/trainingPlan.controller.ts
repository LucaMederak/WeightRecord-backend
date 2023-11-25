import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { startSession } from 'mongoose';

import {
  createTrainingPlan,
  deleteTrainingPlan,
  getAndUpdateTrainingPlan,
  getTrainingPlan,
  getTrainingPlans,
} from '@services/training/trainingPlan.service';

import {
  CreateTrainingPlanInput,
  DeleteTrainingPlanInput,
  GetTrainingPlanInput,
  UpdateTrainingPlanInput,
} from '@schemas/training/trainingPlan.schema';
import { createTrainingUnit } from '@services/training/trainingUnit/trainingUnit.service';
import {
  createManyTrainingUnitStages,
  createTrainingUnitStage,
} from '@services/training/trainingUnit/trainingUnitStage.service';
import { ITrainingUnitStageInput } from '@interfaces/training/trainingUnit/trainingUnitStage.interfaces';

export async function createTrainingPlanController(
  req: Request<object, object, CreateTrainingPlanInput['body']>,
  res: Response,
  next: NextFunction
) {
  const userId = res.locals.user?._id;

  try {
    const trainingPlan = await createTrainingPlan({
      ...req.body,
      user: userId,
    });

    if (!trainingPlan) {
      const httpError = createHttpError(500, {
        message: 'A server error occurred during create trainingPlan',
      });
      return next(httpError);
    }

    return res.status(201).json(trainingPlan);
  } catch (e) {
    const httpError = createHttpError(400);
    return next(httpError);
  }
}

export async function createTrainingPlanWithTrainingUnitController(
  req: Request<object, object, CreateTrainingPlanInput['body']>,
  res: Response,
  next: NextFunction
) {
  const userId = res.locals.user?._id;

  // Rozpocznij sesję MongoDB
  const session = await startSession();

  try {
    // Start transaction
    session.startTransaction();

    const trainingPlan = await createTrainingPlan(
      {
        ...req.body,
        user: userId,
      },
      {
        session,
      }
    );

    const trainingPlanUnit = await createTrainingUnit(
      {
        user: userId,
        trainingPlan: trainingPlan._id,
        name: 'Trening 1',
      },
      {
        session,
      }
    );

    const trainingUnitStages: ITrainingUnitStageInput[] = [
      {
        user: userId,
        trainingUnit: trainingPlanUnit._id,
        name: 'Rozgrzewka',
        type: 'warmUp',
        order: 1,
      },
      {
        user: userId,
        trainingUnit: trainingPlanUnit._id,
        name: 'Trening właściwy',
        type: 'mainTraining',
        order: 2,
      },
    ];

    //create many
    const trainingPlanUnitStages = await createManyTrainingUnitStages(
      trainingUnitStages,
      { session }
    );

    // Commit transaction
    await session.commitTransaction();

    // End session
    await session.endSession();

    return res.status(201).json(trainingPlan);
  } catch (e) {
    await session.abortTransaction();
    await session.endSession();

    const httpError = createHttpError(400);
    return next(httpError);
  }
}

export async function updateTrainingPlanController(
  req: Request<
    UpdateTrainingPlanInput['params'],
    object,
    UpdateTrainingPlanInput['body']
  >,
  res: Response,
  next: NextFunction
) {
  try {
    const trainingPlanId = req.params.trainingPlanId;
    const update = req.body;

    const trainingPlan = await getTrainingPlan({
      _id: trainingPlanId,
    });

    if (!trainingPlan) {
      return res.sendStatus(404);
    }

    const updatedTrainingPlan = await getAndUpdateTrainingPlan(
      { _id: trainingPlanId },
      update,
      {
        new: true,
      }
    );

    return res.send(updatedTrainingPlan);
  } catch (e) {
    const httpError = createHttpError(404);
    return next(httpError);
  }
}

export async function getTrainingPlanController(
  req: Request<GetTrainingPlanInput['params']>,
  res: Response,
  next: NextFunction
) {
  const userId = res.locals.user?._id;
  try {
    const trainingPlanId = req.params.trainingPlanId;
    const trainingPlan = await getTrainingPlan({
      _id: trainingPlanId,
      user: userId,
    });

    if (!trainingPlan) {
      return res.sendStatus(404);
    }

    return res.send(trainingPlan);
  } catch (e) {
    const httpError = createHttpError(404);
    return next(httpError);
  }
}

export async function getTrainingPlansController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = res.locals.user?._id;

  try {
    const trainingPlans = await getTrainingPlans({ user: userId });

    if (!trainingPlans) {
      return res.sendStatus(404);
    }

    return res.send(trainingPlans);
  } catch (e) {
    const httpError = createHttpError(404);
    return next(httpError);
  }
}

export async function deleteTrainingPlanController(
  req: Request<DeleteTrainingPlanInput['params']>,
  res: Response,
  next: NextFunction
) {
  const userId = res.locals.user?._id;

  try {
    const trainingPlanId = req.params.trainingPlanId;

    const trainingPlan = await getTrainingPlan({
      _id: trainingPlanId,
      user: userId,
    });

    if (!trainingPlan) {
      return res.sendStatus(404);
    }
    await deleteTrainingPlan({ _id: trainingPlanId });

    return res.sendStatus(200);
  } catch (e) {
    const httpError = createHttpError(404);
    return next(httpError);
  }
}
