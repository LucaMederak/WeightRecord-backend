import * as yup from 'yup';
import { IUserInput } from '@interfaces/user.interfaces';

const payload: Record<keyof IUserInput, yup.AnySchema> = {
  name: yup.string().required("The user's name is required."),
  lastName: yup.string().required("The user's last name is required."),
  email: yup.string().required().email("The user's email is required."),
  password: yup.string().required("the user's password is required.").min(3),
};

export const createUserSchema = yup.object().shape({
  body: yup.object<Record<keyof IUserInput, yup.AnySchema>>({
    ...payload,
  }),
});

export type CreateUserInput = yup.TypeOf<typeof createUserSchema>;
