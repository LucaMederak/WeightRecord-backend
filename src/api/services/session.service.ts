import { get } from 'lodash';
import { FilterQuery, UpdateQuery } from 'mongoose';
import UserModel from '@models/user.model';
import SessionModel from '@models/session.model';
import { ISessionDocument } from '@interfaces/session.interfaces';
import { verifyJwt, signJwt } from '@utils/jwt.utils';
import { getUser } from './user.service';
import { omit } from 'lodash';
import { logger } from '@utils/logger';

export async function createSession(userId: string, userAgent: string) {
  const metricsLabels = {
    operation: 'createSession',
  };

  try {
    const session = await SessionModel.create({ user: userId, userAgent });
    logger.info({ ...metricsLabels, success: 'true' });
    return session.toJSON();
  } catch (e) {
    logger.error({ ...metricsLabels, success: 'false' });
    return null;
  }
}

export async function findSessions(query: FilterQuery<ISessionDocument>) {
  const metricsLabels = {
    operation: 'getSessions',
  };

  try {
    const sessions = await SessionModel.find(query).lean();
    logger.info({ ...metricsLabels, success: 'true' });

    return sessions;
  } catch (e) {
    logger.error({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function findSession(query: FilterQuery<ISessionDocument>) {
  const metricsLabels = {
    operation: 'getSession',
  };

  try {
    const session = await SessionModel.findOne(query);
    logger.info({ ...metricsLabels, success: 'true' });

    return session;
  } catch (e) {
    logger.error({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function deleteSession(query: FilterQuery<ISessionDocument>) {
  const metricsLabels = {
    operation: 'deleteSession',
  };

  try {
    const session = await SessionModel.deleteOne(query);
    logger.info({ ...metricsLabels, success: 'true' });
    return session;
  } catch (e) {
    logger.error({ ...metricsLabels, success: 'false' });
    throw e;
  }
}

export async function updateSession(
  query: FilterQuery<ISessionDocument>,
  update: UpdateQuery<ISessionDocument>
) {
  return SessionModel.updateOne(query, update);
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), 'password');
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJwt(refreshToken, 'refreshTokenPublicKey');

  if (!decoded || !get(decoded, 'session')) return false;

  const session = await SessionModel.findById(get(decoded, 'session'));

  if (!session || !session.valid) return false;

  const user = await getUser({ _id: session.user });

  if (!user) return false;

  const userToJwt = {
    _id: user._id,
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    // role: user.role,
  };

  const accessToken = signJwt(
    { ...userToJwt, session: session._id },
    'accessTokenPrivateKey',
    { expiresIn: '15m' } // 15 minutes
  );

  return accessToken;
}
