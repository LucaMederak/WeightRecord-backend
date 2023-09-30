import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import MeasurementModel from '../models/measurement.model';
import {
  IMeasurementInput,
  IMeasurementDocument,
} from '@interfaces/measurement.interfaces';

import { logger } from '@utils/logger';

export async function createMeasurement(input: IMeasurementInput) {
  const metricsLabels = {
    operation: 'createMeasurement',
  };

  try {
    const result = await MeasurementModel.create(input);
    logger.info({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    logger.error({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function getMeasurement(
  query: FilterQuery<IMeasurementDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getMeasurement',
  };

  try {
    const result = await MeasurementModel.findOne(query, {}, options).populate([
      { path: 'client', select: ['firstName', 'surname'] },
    ]);
    logger.info({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    logger.error({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getMeasurements(
  query: FilterQuery<IMeasurementDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getMeasurements',
  };

  try {
    const result = await MeasurementModel.find(query, {}, options);
    logger.info({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    logger.error({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getAndUpdateMeasurement(
  query: FilterQuery<IMeasurementDocument>,
  update: UpdateQuery<IMeasurementDocument>,
  options: QueryOptions
) {
  return MeasurementModel.findOneAndUpdate(query, update, options);
}

export async function deleteMeasurement(
  query: FilterQuery<IMeasurementDocument>
) {
  return MeasurementModel.deleteOne(query);
}
