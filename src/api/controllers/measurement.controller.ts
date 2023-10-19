import { NextFunction, Request, Response } from 'express';

import {
  createMeasurement,
  deleteMeasurement,
  getAndUpdateMeasurement,
  getMeasurement,
  getMeasurements,
} from '@services/measurement.service';

import createHttpError from 'http-errors';
import {
  CreateMeasurementInput,
  DeleteMeasurementInput,
  GetClientMeasurementsInput,
  GetMeasurementInput,
  UpdateMeasurementInput,
} from '@schemas/measurement.schema';

export async function createMeasurementController(
  req: Request<object, object, CreateMeasurementInput['body']>,
  res: Response,
  next: NextFunction
) {
  const userId = res.locals.user?._id;

  try {
    const measurement = await createMeasurement({
      ...req.body,
      user: userId,
    });

    if (!measurement) {
      const httpError = createHttpError(404, {
        message: 'A server error occurred during create client',
      });
      return next(httpError);
    }

    return res.status(201).json(measurement);
  } catch (e) {
    const httpError = createHttpError(409);
    return next(httpError);
  }
}

export async function updateMeasurementController(
  req: Request<
    UpdateMeasurementInput['params'],
    object,
    UpdateMeasurementInput['body']
  >,
  res: Response,
  next: NextFunction
) {
  try {
    const measurementId = req.params.measurementId;
    const update = req.body;

    const measurement = await getMeasurement({
      _id: measurementId,
    });

    if (!measurement) {
      return res.sendStatus(404);
    }

    const updatedMeasurement = await getAndUpdateMeasurement(
      { _id: measurementId },
      update,
      {
        new: true,
      }
    );

    return res.send(updatedMeasurement);
  } catch (e) {
    const httpError = createHttpError(404);
    return next(httpError);
  }
}

export async function getMeasurementController(
  req: Request<GetMeasurementInput['params']>,
  res: Response,
  next: NextFunction
) {
  try {
    const measurementId = req.params.measurementId;
    const measurement = await getMeasurement({
      _id: measurementId,
    });

    if (!measurement) {
      return res.sendStatus(404);
    }

    return res.send(measurement);
  } catch (e) {
    const httpError = createHttpError(404);
    return next(httpError);
  }
}

export async function getMeasurementsController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = res.locals.user?._id;

  try {
    const measurements = await getMeasurements({ user: userId });

    if (!measurements) {
      return res.sendStatus(404);
    }

    return res.send(measurements);
  } catch (e) {
    const httpError = createHttpError(404);
    return next(httpError);
  }
}

export async function getClientMeasurementsController(
  req: Request<object, object, object, GetClientMeasurementsInput['query']>,
  res: Response,
  next: NextFunction
) {
  const clientId = req.query.clientId;

  try {
    const clientMeasurements = await getMeasurements({ client: clientId });

    if (!clientMeasurements) {
      return res.sendStatus(404);
    }

    return res.send(clientMeasurements);
  } catch (e) {
    const httpError = createHttpError(404);
    return next(httpError);
  }
}

export async function deleteMeasurementController(
  req: Request<DeleteMeasurementInput['params']>,
  res: Response,
  next: NextFunction
) {
  try {
    const measurementId = req.params.measurementId;

    const measurement = await getMeasurement({
      _id: measurementId,
    });

    if (!measurement) {
      return res.sendStatus(404);
    }
    await deleteMeasurement({ _id: measurementId });

    return res.sendStatus(200);
  } catch (e) {
    const httpError = createHttpError(404);
    return next(httpError);
  }
}
