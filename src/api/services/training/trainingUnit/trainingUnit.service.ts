import { FilterQuery, QueryOptions, UpdateQuery, SaveOptions } from 'mongoose';

import TrainingUnitModel from '@models/training/trainingUnit/trainingUnit.model';

import {
  ITrainingUnitInput,
  ITrainingUnitDocument,
} from '@interfaces/training/trainingUnit/trainingUnit.interfaces';

import { logger } from '@utils/logger';

export async function createTrainingUnit(
  input: ITrainingUnitInput,
  options?: SaveOptions
) {
  const metricsLabels = {
    operation: 'createTrainingUnit',
  };

  try {
    const result = await TrainingUnitModel.create([input], options);
    logger.info({ ...metricsLabels, success: 'true' });
    return result[0];
  } catch (e) {
    logger.error({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function getTrainingUnit(
  query: FilterQuery<ITrainingUnitDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getTrainingUnit',
  };

  try {
    const result = await TrainingUnitModel.findOne(query, {}, options);
    logger.info({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    logger.error({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getTrainingUnits(
  query: FilterQuery<ITrainingUnitDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getTrainingUnits',
  };

  try {
    const result = await TrainingUnitModel.find(query, {}, options);
    logger.info({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    logger.error({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getAndUpdateTrainingUnit(
  query: FilterQuery<ITrainingUnitDocument>,
  update: UpdateQuery<ITrainingUnitDocument>,
  options: QueryOptions
) {
  return TrainingUnitModel.findOneAndUpdate(query, update, options);
}

export async function deleteTrainingUnit(
  query: FilterQuery<ITrainingUnitDocument>
) {
  return TrainingUnitModel.deleteOne(query);
}
