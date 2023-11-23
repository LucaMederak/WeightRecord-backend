import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import TrainingUnitStageModel from '@models/training/trainingUnit/trainingUnitStage.model';

import {
  ITrainingUnitStageInput,
  ITrainingUnitStageDocument,
} from '@interfaces/training/trainingUnit/trainingUnitStage.interfaces';

import { logger } from '@utils/logger';

export async function createTrainingUnitStage(input: ITrainingUnitStageInput) {
  const metricsLabels = {
    operation: 'createTrainingUnitStage',
  };

  try {
    const result = await TrainingUnitStageModel.create(input);
    logger.info({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    logger.error({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function getTrainingUnitStage(
  query: FilterQuery<ITrainingUnitStageDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getTrainingUnitStage',
  };

  try {
    const result = await TrainingUnitStageModel.findOne(query, {}, options);
    logger.info({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    logger.error({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getTrainingUnitStages(
  query: FilterQuery<ITrainingUnitStageDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getTrainingUnitStages',
  };

  try {
    const result = await TrainingUnitStageModel.find(query, {}, options);
    logger.info({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    logger.error({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getAndUpdateTrainingUnitStage(
  query: FilterQuery<ITrainingUnitStageDocument>,
  update: UpdateQuery<ITrainingUnitStageDocument>,
  options: QueryOptions
) {
  return TrainingUnitStageModel.findOneAndUpdate(query, update, options);
}

export async function deleteTrainingUnitStage(
  query: FilterQuery<ITrainingUnitStageDocument>
) {
  return TrainingUnitStageModel.deleteOne(query);
}
