import * as yup from 'yup';
import { ITrainingPlanInput } from '@interfaces/training/trainingPlan.interfaces';

const payload: Record<keyof Omit<ITrainingPlanInput, 'user'>, yup.AnySchema> = {
  name: yup.string().required(),
  template: yup.boolean().required(),
};

const params = {
  trainingPlanId: yup.string().required('Training plan id is required'),
};

export const createTrainingPlanSchema = yup.object().shape({
  body: yup.object().shape({
    ...payload,
  }),
});

export const updateTrainingPlanSchema = yup.object().shape({
  body: yup.object().shape({
    ...payload,
  }),
  params: yup.object().shape({
    ...params,
  }),
});

export const getTrainingPlanSchema = yup.object().shape({
  params: yup.object().shape({
    ...params,
  }),
});

export const deleteTrainingPlanSchema = yup.object().shape({
  params: yup.object().shape({
    ...params,
  }),
});

export type CreateTrainingPlanInput = yup.TypeOf<
  typeof createTrainingPlanSchema
>;
export type UpdateTrainingPlanInput = yup.TypeOf<
  typeof updateTrainingPlanSchema
>;
export type GetTrainingPlanInput = yup.TypeOf<typeof getTrainingPlanSchema>;
export type DeleteTrainingPlanInput = yup.TypeOf<
  typeof deleteTrainingPlanSchema
>;
