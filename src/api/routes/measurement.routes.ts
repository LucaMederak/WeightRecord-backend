import express from 'express';

//controllers
import {
  createMeasurementController,
  getMeasurementsController,
  getMeasurementController,
  deleteMeasurementController,
  updateMeasurementController,
} from '@controllers/measurement.controller';

//schema
import {
  createMeasurementSchema,
  updateMeasurementSchema,
  deleteMeasurementSchema,
  getMeasurementSchema,
} from '@schemas/measurement.schema';

//middleware
import requireUser from '@middleware/requireUser';
import { validateSchema } from '@middleware/validateSchema';

const router = express.Router();

router.post(
  '/',
  [requireUser, validateSchema(createMeasurementSchema)],
  createMeasurementController
);

router.get('/', requireUser, getMeasurementsController);

router.get(
  '/:measurementId',
  [requireUser, validateSchema(getMeasurementSchema)],
  getMeasurementController
);

router.put(
  '/:measurementId',
  [requireUser, validateSchema(updateMeasurementSchema)],
  updateMeasurementController
);

router.delete(
  '/:measurementId',
  [requireUser, validateSchema(deleteMeasurementSchema)],
  deleteMeasurementController
);

export default router;
