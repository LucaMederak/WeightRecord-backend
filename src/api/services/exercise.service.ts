import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import ExerciseModel from '../models/exercise.model';
import {
  IExerciseInput,
  IExerciseDocument,
} from '@interfaces/exercise.interfaces';

import { logger } from '@utils/logger';

export async function createExercise(input: IExerciseInput) {
  const metricsLabels = {
    operation: 'createExercise',
  };

  try {
    const result = await ExerciseModel.create(input);
    logger.info({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    logger.error({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function getExercise(
  query: FilterQuery<IExerciseDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getExercise',
  };

  try {
    const result = await ExerciseModel.findOne(query, {}, options);
    logger.info({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    logger.error({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getExercises(
  query: FilterQuery<IExerciseDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getExercises',
  };

  try {
    const result = await ExerciseModel.find(query, {}, options);
    logger.info({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    logger.error({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getAndUpdateExercise(
  query: FilterQuery<IExerciseDocument>,
  update: UpdateQuery<IExerciseDocument>,
  options: QueryOptions
) {
  return ExerciseModel.findOneAndUpdate(query, update, options);
}

export async function deleteExercise(query: FilterQuery<IExerciseDocument>) {
  return ExerciseModel.deleteOne(query);
}
