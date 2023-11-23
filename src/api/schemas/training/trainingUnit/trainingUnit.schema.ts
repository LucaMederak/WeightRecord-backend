import * as yup from 'yup';
import { ITrainingUnitInput } from '@interfaces/training/trainingUnit/trainingUnit.interfaces';

const payload: Record<keyof Omit<ITrainingUnitInput, 'user'>, yup.AnySchema> = {
  name: yup.string().required(),
  trainingPlan: yup.string().required(),
};

const params = {
  trainingUnitId: yup.string().required('Training unit id is required'),
};

export const createTrainingUnitSchema = yup.object().shape({
  body: yup.object().shape({
    ...payload,
  }),
});

export const updateTrainingUnitSchema = yup.object().shape({
  body: yup.object().shape({
    ...payload,
  }),
  params: yup.object().shape({
    ...params,
  }),
});

export const getTrainingUnitSchema = yup.object().shape({
  params: yup.object().shape({
    ...params,
  }),
});

export const deleteTrainingUnitSchema = yup.object().shape({
  params: yup.object().shape({
    ...params,
  }),
});

export type CreateTrainingUnitInput = yup.TypeOf<
  typeof createTrainingUnitSchema
>;
export type UpdateTrainingUnitInput = yup.TypeOf<
  typeof updateTrainingUnitSchema
>;
export type GetTrainingUnitInput = yup.TypeOf<typeof getTrainingUnitSchema>;
export type DeleteTrainingUnitInput = yup.TypeOf<
  typeof deleteTrainingUnitSchema
>;
