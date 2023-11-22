import { NextFunction, Request, Response } from 'express';
import { CreateUserInput } from '@schemas/user.schema';
import {
  createUser,
  getAndUpdateUser,
  getUser,
  validateEmail,
} from '@services/user.service';

import createHttpError from 'http-errors';

export async function createUserController(
  req: Request<object, object, CreateUserInput['body']>,
  res: Response,
  next: NextFunction
) {
  try {
    const email = req.body.email;
    const existingUserEmail = await validateEmail(email);

    if (existingUserEmail) {
      const httpError = createHttpError(409, {
        message: 'There is already a user with this email address',
      });
      return next(httpError);
    }

    const user = await createUser(req.body);
    if (!user) {
      const httpError = createHttpError(500, {
        message: 'A server error occurred during registration',
      });
      return next(httpError);
    }

    return res.status(201).json({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
    });
  } catch (e) {
    const httpError = createHttpError(409);
    return next(httpError);
  }
}

export async function getUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = res.locals.user?._id;

  try {
    const user = await getUser({ _id: userId });

    if (!user) {
      const httpError = createHttpError(404);
      return next(httpError);
    }

    return res.send(user);
  } catch (e) {
    return next(e);
  }
}
