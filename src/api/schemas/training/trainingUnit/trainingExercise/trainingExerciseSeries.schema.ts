import * as yup from 'yup';
import { ITrainingExerciseSeriesInput } from '@interfaces/training/trainingUnit/trainingExercise/trainingExerciseSeries.interfaces';

const payload: Record<
  keyof Omit<ITrainingExerciseSeriesInput, 'user'>,
  yup.AnySchema
> = {
  name: yup.string().required(),
  order: yup.number().required(),
  repetitionsNumber: yup.number().required(),
  load: yup.number().required(), //kg
  tempo: yup.number(),
  trainingExercise: yup.string().required(),
};

const params = {
  trainingExerciseSeriesId: yup
    .string()
    .required('Training exercise series id is required'),
};

export const createTrainingExerciseSeriesSchema = yup.object().shape({
  body: yup.object().shape({
    ...payload,
  }),
});

export const updateTrainingExerciseSeriesSchema = yup.object().shape({
  body: yup.object().shape({
    ...payload,
  }),
  params: yup.object().shape({
    ...params,
  }),
});

export const getTrainingExerciseSeriesSchema = yup.object().shape({
  params: yup.object().shape({
    ...params,
  }),
});

export const deleteTrainingExerciseSeriesSchema = yup.object().shape({
  params: yup.object().shape({
    ...params,
  }),
});

export type CreateTrainingExerciseSeriesInput = yup.TypeOf<
  typeof createTrainingExerciseSeriesSchema
>;
export type UpdateTrainingExerciseSeriesInput = yup.TypeOf<
  typeof updateTrainingExerciseSeriesSchema
>;
export type GetTrainingExerciseSeriesInput = yup.TypeOf<
  typeof getTrainingExerciseSeriesSchema
>;
export type DeleteTrainingExerciseSeriesInput = yup.TypeOf<
  typeof deleteTrainingExerciseSeriesSchema
>;
