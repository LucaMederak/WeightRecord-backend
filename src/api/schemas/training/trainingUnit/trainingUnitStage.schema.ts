import * as yup from 'yup';
import { ITrainingUnitStageInput } from '@interfaces/training/trainingUnit/trainingUnitStage.interfaces';

const payload: Record<
  keyof Omit<ITrainingUnitStageInput, 'user'>,
  yup.AnySchema
> = {
  name: yup.string().required(),
  trainingUnit: yup.string().required(),
  type: yup.string().oneOf(['warmUp', 'mainTraining']),
  order: yup.number().required(),
};

const params = {
  trainingUnitStageId: yup
    .string()
    .required('Training unit stage id is required'),
};

export const createTrainingUnitStageSchema = yup.object().shape({
  body: yup.object().shape({
    ...payload,
  }),
});

export const updateTrainingUnitStageSchema = yup.object().shape({
  body: yup.object().shape({
    ...payload,
  }),
  params: yup.object().shape({
    ...params,
  }),
});

export const getTrainingUnitStageSchema = yup.object().shape({
  params: yup.object().shape({
    ...params,
  }),
});

export const deleteTrainingUnitStageSchema = yup.object().shape({
  params: yup.object().shape({
    ...params,
  }),
});

export type CreateTrainingUnitStageInput = yup.TypeOf<
  typeof createTrainingUnitStageSchema
>;
export type UpdateTrainingUnitStageInput = yup.TypeOf<
  typeof updateTrainingUnitStageSchema
>;
export type GetTrainingUnitStageInput = yup.TypeOf<
  typeof getTrainingUnitStageSchema
>;
export type DeleteTrainingUnitStageInput = yup.TypeOf<
  typeof deleteTrainingUnitStageSchema
>;
