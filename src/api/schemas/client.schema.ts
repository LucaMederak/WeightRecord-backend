import * as yup from 'yup';
import { IUserInput } from '@interfaces/user.interfaces';
import { IClientInput } from '@interfaces/client.interfaces';

const payload: Record<keyof Omit<IClientInput, 'user'>, yup.AnySchema> = {
  firstName: yup.string().required(),
  surname: yup.string().required(),
  email: yup.string().email(),
  // dateOfBirth: yup.string().transform((date) => new Date(date)),
  dateOfBirth: yup.date().required(),
  gender: yup.string().oneOf(['male', 'female']),
  phoneNumber: yup.string(),
  street: yup.string(),
  zipCode: yup.string(),
  city: yup.string(),
  notes: yup.string(),
  diseases: yup.array(
    yup
      .string()
      .oneOf([
        'flatulence',
        'constipation',
        'reflux',
        'obesity',
        'osteoporosis',
        'gout',
        'atherosclerosis',
        'hypertension',
        'tumor',
      ])
  ),
  alergens: yup.array(yup.string().oneOf(['peanuts', 'rye', 'eggProtein'])),
  expectedBodyWeight: yup.number(),
  specificAims: yup.array(yup.string()),
  pal: yup
    .number()
    .required()
    .min(1.3, 'Pal too short - should 1.3')
    .max(2.2, 'Pal too big - max 2.2'),
};

const params = {
  clientId: yup.string().required('Client id is required'),
};

export const createClientSchema = yup.object().shape({
  body: yup.object().shape({
    ...payload,
  }),
});

export const updateClientSchema = yup.object().shape({
  body: yup.object().shape({
    ...payload,
  }),
  params: yup.object().shape({
    ...params,
  }),
});

export const getClientSchema = yup.object().shape({
  params: yup.object().shape({
    ...params,
  }),
});

export const deleteClientSchema = yup.object().shape({
  params: yup.object().shape({
    ...params,
  }),
});

export type CreateClientInput = yup.TypeOf<typeof createClientSchema>;
export type UpdateClientInput = yup.TypeOf<typeof updateClientSchema>;
export type GetClientInput = yup.TypeOf<typeof getClientSchema>;
export type DeleteClientInput = yup.TypeOf<typeof deleteClientSchema>;
