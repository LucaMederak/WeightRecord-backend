import * as yup from 'yup';
import { IExerciseInput } from '@interfaces/exercise.interfaces';

const payload: Record<keyof Omit<IExerciseInput, 'user'>, yup.AnySchema> = {
  name: yup.string().required(),
  description: yup.string(),
  image: yup.string(),
  instruction: yup.array(
    yup.object({
      order: yup.number().required(),
      description: yup.string().required(),
    })
  ),
  video: yup
    .object({
      type: yup.string().oneOf(['link', 'asset']).required(),
      link: yup.string().when('type', {
        is: 'link',
        then: yup.string().required(),
      }),
      asset: yup.string().when('type', {
        is: 'asset',
        then: yup.string().required(),
      }),
    })
    .optional()
    .default(undefined),
  alternativeNames: yup.array(yup.string()),
  attachments: yup.array(yup.string()),
};

const params = {
  exerciseId: yup.string().required('Exercise id is required'),
};

export const createExerciseSchema = yup.object().shape({
  body: yup.object().shape({
    ...payload,
  }),
});

export const updateExerciseSchema = yup.object().shape({
  body: yup.object().shape({
    ...payload,
  }),
  params: yup.object().shape({
    ...params,
  }),
});

export const getExerciseSchema = yup.object().shape({
  params: yup.object().shape({
    ...params,
  }),
});

export const deleteExerciseSchema = yup.object().shape({
  params: yup.object().shape({
    ...params,
  }),
});

export type CreateExerciseInput = yup.TypeOf<typeof createExerciseSchema>;
export type UpdateExerciseInput = yup.TypeOf<typeof updateExerciseSchema>;
export type GetExerciseInput = yup.TypeOf<typeof getExerciseSchema>;
export type DeleteExerciseInput = yup.TypeOf<typeof deleteExerciseSchema>;
