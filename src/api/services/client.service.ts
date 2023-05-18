import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import ClientModel from '@models/client.model';
import { IClientInput, IClientDocument } from '@interfaces/client.interfaces';
import { logger } from '@utils/logger';

export async function createClient(input: IClientInput) {
  const metricsLabels = {
    operation: 'createClient',
  };

  try {
    const result = await ClientModel.create(input);
    logger.info({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    logger.error({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function getClient(
  query: FilterQuery<IClientDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getClient',
  };

  try {
    const result = await ClientModel.findOne(query, {}, options);
    logger.info({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    logger.error({ ...metricsLabels, success: 'false' });

    throw e;
  }
}

export async function getClients(
  query: FilterQuery<IClientDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: 'getClients',
  };

  try {
    const result = await ClientModel.find(query, {}, options);
    logger.info({ ...metricsLabels, success: 'true' });
    return result;
  } catch (e) {
    logger.error({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function getAndUpdateClient(
  query: FilterQuery<IClientDocument>,
  update: UpdateQuery<IClientDocument>,
  options: QueryOptions
) {
  return ClientModel.findOneAndUpdate(query, update, options);
}

export async function deleteClient(query: FilterQuery<IClientDocument>) {
  return ClientModel.deleteOne(query);
}
