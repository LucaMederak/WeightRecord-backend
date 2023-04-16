import { Request, Response, NextFunction } from 'express';
import {
  createSession,
  findSessions,
  deleteSession,
  updateSession,
} from '../services/session.service';

import { validatePassword } from '@services/session.service';
import createHttpError from 'http-errors';
import { signJwt } from '@utils/jwt.utils';

import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from '@utils/cookieOptions';

export async function createUserSessionController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Validate the user's password
  const user = await validatePassword(req.body);

  if (!user) {
    const httpError = createHttpError(401, {
      message: 'Invalid email or password',
    });
    return next(httpError);
  }

  // create a session
  const session = await createSession(user._id, req.get('user-agent') || '');

  if (!session) {
    const httpError = createHttpError(500);
    return next(httpError);
  }

  const userToJwt = {
    _id: user._id,
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    // role: user.role,
  };

  console.log({ userToJwt });

  try {
    // create an access token
    const accessToken = signJwt(
      { ...userToJwt, session: session._id },
      'accessTokenPrivateKey',
      { expiresIn: '15m' } // 15 minutes,
    );

    // create a refresh token
    const refreshToken = signJwt(
      { ...userToJwt, session: session._id },
      'refreshTokenPrivateKey',
      { expiresIn: '1y' }
    );

    console.log({ accessToken, refreshToken });

    res.cookie('accessToken', accessToken, accessTokenCookieOptions);
    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

    return res.send({ accessToken, refreshToken });
  } catch (e) {
    console.log({ createSessionError: e });
    deleteSession({ _id: session._id });
    const httpError = createHttpError(500);
    return next(httpError);
  }
}

export async function getUserSessionsController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.user?._id;
    const sessions = await findSessions({ user: userId, valid: true });

    return res.send(sessions);
  } catch (e) {
    const httpError = createHttpError(400);
    return next(httpError);
  }
}

export async function deleteUserSessionController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const sessionId = res.locals.user?.session;

    await updateSession({ _id: sessionId }, { valid: false });

    res.cookie('accessToken', '', {
      maxAge: -900000, // 15 mins
      ...accessTokenCookieOptions,
    });

    res.cookie('refreshToken', '', {
      maxAge: -3.154e10, // 1 year
      ...refreshTokenCookieOptions,
    });

    return res.send({
      accessToken: null,
      refreshToken: null,
    });
  } catch (e) {
    const httpError = createHttpError(400);
    return next(httpError);
  }
}
