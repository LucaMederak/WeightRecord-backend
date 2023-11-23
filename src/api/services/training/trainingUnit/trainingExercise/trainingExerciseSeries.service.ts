import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

import TrainingExerciseSeriesModel from '@models/training/trainingUnit/trainingExercise/trainingExerciseSeries.model';

import {
  ITrainingExerciseSeriesInput,
  ITrainingExerciseSeriesDocument,
} from '@interfaces/training/trainingUnit/trainingExercise/trainingExerciseSeries.interfaces';

import { logger } from '@utils/logger';

export async function createTrainingExerciseSeries(
  input: ITrainingExerciseSeriesInput
) {
  const metricsLabels = {
    operation: 'createTrainingExerciseSeries',
  };

  try {
    const result = await TrainingExerciseSeriesModel.create(input);
    logger.info({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    logger.error({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function getTrainingExerciseSeries(
  query: FilterQuery<ITrainingExerciseSeriesDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getTrainingExerciseSeries',
  };

  try {
    const result = await TrainingExerciseSeriesModel.findOne(
      query,
      {},
      options
    );
    logger.info({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    logger.error({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getAllTrainingExerciseSeries(
  query: FilterQuery<ITrainingExerciseSeriesDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getAllTrainingExerciseSeries',
  };

  try {
    const result = await TrainingExerciseSeriesModel.find(query, {}, options);
    logger.info({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    logger.error({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getAndUpdateTrainingExerciseSeries(
  query: FilterQuery<ITrainingExerciseSeriesDocument>,
  update: UpdateQuery<ITrainingExerciseSeriesDocument>,
  options: QueryOptions
) {
  return TrainingExerciseSeriesModel.findOneAndUpdate(query, update, options);
}

export async function deleteTrainingExerciseSeries(
  query: FilterQuery<ITrainingExerciseSeriesDocument>
) {
  return TrainingExerciseSeriesModel.deleteOne(query);
}
