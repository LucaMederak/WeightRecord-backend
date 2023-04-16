import { FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import UserModel from '@models/user.model';
import { IUserInput, IUserDocument } from '@interfaces/user.interfaces';
import { logger } from '@utils/logger';

export async function createUser(input: IUserInput) {
  const metricsLabels = {
    operation: 'createUser',
  };

  try {
    const result = await UserModel.create(input);
    logger.info({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    logger.error({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function getUser(query: FilterQuery<IUserDocument>) {
  const metricsLabels = {
    operation: 'getUser',
  };

  try {
    const user = await UserModel.findOne(query);
    logger.info({ ...metricsLabels, success: 'true' });

    return user;
  } catch (e) {
    logger.error({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

//google oauth
export async function findAndUpdateUser(
  query: FilterQuery<IUserDocument>,
  update: UpdateQuery<IUserDocument>,
  options: QueryOptions = {}
) {
  const metricsLabels = {
    operation: 'findAndUpdateUser',
  };

  try {
    const user = await UserModel.findOneAndUpdate(query, update, options);
    logger.info({ ...metricsLabels, success: 'true' });

    return user;
  } catch (e) {
    logger.error({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function getAndUpdateUser(
  query: FilterQuery<IUserDocument>,
  update: UpdateQuery<IUserDocument>,
  options: QueryOptions
) {
  const metricsLabels = {
    operation: 'updateUser',
  };

  try {
    const result = await UserModel.findOneAndUpdate(query, update, options);

    logger.info({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    logger.error({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function validateEmail(email: string) {
  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    return true;
  }

  return false;
}
