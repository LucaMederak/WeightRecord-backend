import * as yup from 'yup';

import { IMeasurementInput } from '@interfaces/measurement.interfaces';

const payload: Record<keyof Omit<IMeasurementInput, 'user'>, yup.AnySchema> = {
  name: yup.string().required(),
  client: yup.string().required(),
  date: yup.date().required(),
  notes: yup.string(),
  weight: yup.number().positive().required(),
  height: yup.number().positive().required(),
  bmi: yup.number().positive().required(),
  ppmMifflin: yup.number().positive().required(),
  ppmHarris: yup.number().positive().required(),
  cpm: yup.number().positive().required(),
  whr: yup.number().positive(),
  whtr: yup.number().positive(),
  ymca: yup.number().positive(),
  chest_breath: yup.number().positive(),
  chest_exhaust: yup.number().positive(),
  shoulder: yup.number().positive(),
  shoulder_tonus: yup.number().positive(),
  waist: yup.number().positive(),
  hip: yup.number().positive(),
  forearm: yup.number().positive(),
  thigh: yup.number().positive(),
  calf: yup.number().positive(),
  biceps: yup.number().positive(),
  triceps: yup.number().positive(),
  shoulder_blade: yup.number().positive(),
  ala_of_ilium: yup.number().positive(),
  iliac_spine: yup.number().positive(),
};

const params = {
  measurementId: yup.string().required('Measurement id is required'),
};

export const createMeasurementSchema = yup.object().shape({
  body: yup.object().shape({
    ...payload,
  }),
});

export const updateMeasurementSchema = yup.object().shape({
  body: yup.object().shape({
    ...payload,
  }),
  params: yup.object().shape({
    ...params,
  }),
});

export const getMeasurementSchema = yup.object().shape({
  params: yup.object().shape({
    ...params,
  }),
});

export const deleteMeasurementSchema = yup.object().shape({
  params: yup.object().shape({
    ...params,
  }),
});

export type CreateMeasurementInput = yup.TypeOf<typeof createMeasurementSchema>;
export type UpdateMeasurementInput = yup.TypeOf<typeof updateMeasurementSchema>;
export type GetMeasurementInput = yup.TypeOf<typeof getMeasurementSchema>;
export type DeleteMeasurementInput = yup.TypeOf<typeof deleteMeasurementSchema>;
