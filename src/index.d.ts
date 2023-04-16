import { IUserJWT } from '@interfaces/user.interfaces';

import 'express';

interface Locals {
  user?: IUserJWT;
}

declare module 'express' {
  export interface Response {
    locals: Locals;
  }
}
