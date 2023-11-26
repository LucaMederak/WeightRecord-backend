import { NextFunction, Request, Response } from 'express';

import {
  createClient,
  deleteClient,
  getAndUpdateClient,
  getClient,
  getClients,
} from '@services/client.service';

import createHttpError from 'http-errors';
import {
  CreateClientInput,
  DeleteClientInput,
  GetClientInput,
  UpdateClientInput,
} from '@schemas/client.schema';

export async function createClientController(
  req: Request<object, object, CreateClientInput['body']>,
  res: Response,
  next: NextFunction
) {
  const userId = res.locals.user?._id;

  try {
    const client = await createClient({
      ...req.body,
      user: userId,
    });

    if (!client) {
      const httpError = createHttpError(404, {
        message: 'A server error occurred during create client',
      });
      return next(httpError);
    }

    return res.status(201).json(client);
  } catch (e) {
    return next(e);
  }
}

export async function updateClientController(
  req: Request<UpdateClientInput['params'], object, UpdateClientInput['body']>,
  res: Response,
  next: NextFunction
) {
  try {
    const clientId = req.params.clientId;
    const update = req.body;

    const client = await getClient({
      _id: clientId,
    });

    if (!client) {
      return res.sendStatus(404);
    }

    const updatedClient = await getAndUpdateClient({ _id: clientId }, update, {
      new: true,
    });

    return res.send(updatedClient);
  } catch (e) {
    const httpError = createHttpError(404);
    return next(httpError);
  }
}

export async function getClientController(
  req: Request<GetClientInput['params']>,
  res: Response,
  next: NextFunction
) {
  try {
    const clientId = req.params.clientId;
    const client = await getClient({
      _id: clientId,
    });

    if (!client) {
      return res.sendStatus(404);
    }

    return res.send(client);
  } catch (e) {
    const httpError = createHttpError(404);
    return next(httpError);
  }
}

export async function getClientsController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = res.locals.user?._id;

  try {
    const clients = await getClients({ user: userId });

    if (!clients) {
      return res.sendStatus(404);
    }

    return res.send(clients);
  } catch (e) {
    const httpError = createHttpError(404);
    return next(httpError);
  }
}

export async function deleteClientController(
  req: Request<DeleteClientInput['params']>,
  res: Response,
  next: NextFunction
) {
  try {
    const clientId = req.params.clientId;

    const client = await getClient({
      _id: clientId,
    });

    if (!client) {
      return res.sendStatus(404);
    }
    await deleteClient({ _id: clientId });

    return res.sendStatus(200);
  } catch (e) {
    const httpError = createHttpError(404);
    return next(httpError);
  }
}
