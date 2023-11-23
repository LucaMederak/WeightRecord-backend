import * as yup from 'yup';
import { ITrainingExerciseInput } from '@interfaces/training/trainingUnit/trainingExercise/trainingExercise.interfaces';

const payload: Record<
  keyof Omit<ITrainingExerciseInput, 'user'>,
  yup.AnySchema
> = {
  name: yup.string().required(),
  order: yup.number().required(),
  trainingUnitStage: yup.string().required(),
  exercise: yup.string().required(),
};

const params = {
  trainingExerciseId: yup.string().required('Training exercise id is required'),
};

export const createTrainingExerciseSchema = yup.object().shape({
  body: yup.object().shape({
    ...payload,
  }),
});

export const updateTrainingExerciseSchema = yup.object().shape({
  body: yup.object().shape({
    ...payload,
  }),
  params: yup.object().shape({
    ...params,
  }),
});

export const getTrainingExerciseSchema = yup.object().shape({
  params: yup.object().shape({
    ...params,
  }),
});

export const deleteTrainingExerciseSchema = yup.object().shape({
  params: yup.object().shape({
    ...params,
  }),
});

export type CreateTrainingExerciseInput = yup.TypeOf<
  typeof createTrainingExerciseSchema
>;
export type UpdateTrainingExerciseInput = yup.TypeOf<
  typeof updateTrainingExerciseSchema
>;
export type GetTrainingExerciseInput = yup.TypeOf<
  typeof getTrainingExerciseSchema
>;
export type DeleteTrainingExerciseInput = yup.TypeOf<
  typeof deleteTrainingExerciseSchema
>;
