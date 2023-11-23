import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import TrainingExerciseModel from '@models/training/trainingUnit/trainingExercise/trainingExercise.model';

import {
  ITrainingExerciseInput,
  ITrainingExerciseDocument,
} from '@interfaces/training/trainingUnit/trainingExercise/trainingExercise.interfaces';

import { logger } from '@utils/logger';

export async function createTrainingExercise(input: ITrainingExerciseInput) {
  const metricsLabels = {
    operation: 'createTrainingExercise',
  };

  try {
    const result = await TrainingExerciseModel.create(input);
    logger.info({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    logger.error({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function getTrainingExercise(
  query: FilterQuery<ITrainingExerciseDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getTrainingExercise',
  };

  try {
    const result = await TrainingExerciseModel.findOne(query, {}, options);
    logger.info({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    logger.error({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getTrainingExercises(
  query: FilterQuery<ITrainingExerciseDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getTrainingExercises',
  };

  try {
    const result = await TrainingExerciseModel.find(query, {}, options);
    logger.info({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    logger.error({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getAndUpdateTrainingExercise(
  query: FilterQuery<ITrainingExerciseDocument>,
  update: UpdateQuery<ITrainingExerciseDocument>,
  options: QueryOptions
) {
  return TrainingExerciseModel.findOneAndUpdate(query, update, options);
}

export async function deleteTrainingExercise(
  query: FilterQuery<ITrainingExerciseDocument>
) {
  return TrainingExerciseModel.deleteOne(query);
}
