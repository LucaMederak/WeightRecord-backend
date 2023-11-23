import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import TrainingPlanModel from '@models/training/trainingPlan.model';

import {
  ITrainingPlanInput,
  ITrainingPlanDocument,
} from '@interfaces/training/trainingPlan.interfaces';

import { logger } from '@utils/logger';

export async function createTrainingPlan(input: ITrainingPlanInput) {
  const metricsLabels = {
    operation: 'createTrainingPlan',
  };

  try {
    const result = await TrainingPlanModel.create(input);
    logger.info({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    logger.error({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function getTrainingPlan(
  query: FilterQuery<ITrainingPlanDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getTrainingPlan',
  };

  try {
    const result = await TrainingPlanModel.findOne(query, {}, options);
    logger.info({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    logger.error({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getTrainingPlans(
  query: FilterQuery<ITrainingPlanDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getTrainingPlans',
  };

  try {
    const result = await TrainingPlanModel.find(query, {}, options);
    logger.info({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    logger.error({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getAndUpdateTrainingPlan(
  query: FilterQuery<ITrainingPlanDocument>,
  update: UpdateQuery<ITrainingPlanDocument>,
  options: QueryOptions
) {
  return TrainingPlanModel.findOneAndUpdate(query, update, options);
}

export async function deleteTrainingPlan(
  query: FilterQuery<ITrainingPlanDocument>
) {
  return TrainingPlanModel.deleteOne(query);
}
