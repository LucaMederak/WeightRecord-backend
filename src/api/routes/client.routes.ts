import express from 'express';

//controllers
import {
  createClientController,
  getClientsController,
  getClientController,
  deleteClientController,
  updateClientController,
} from '@controllers/client.controller';

//schema
import {
  createClientSchema,
  updateClientSchema,
  deleteClientSchema,
  getClientSchema,
} from '@schemas/client.schema';

//middleware
import requireUser from '@middleware/requireUser';
import { validateSchema } from '@middleware/validateSchema';

const router = express.Router();

router.post(
  '/',
  [requireUser, validateSchema(createClientSchema)],
  createClientController
);

router.get('/', requireUser, getClientsController);

router.get(
  '/:clientId',
  [requireUser, validateSchema(getClientSchema)],
  getClientController
);

router.put(
  '/:clientId',
  [requireUser, validateSchema(updateClientSchema)],
  updateClientController
);

router.delete(
  '/:clientId',
  [requireUser, validateSchema(deleteClientSchema)],
  deleteClientController
);

export default router;
