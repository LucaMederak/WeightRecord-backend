import mongoose from 'mongoose';
import { IAssetDocument } from './asset.interfaces';
import { ISessionDocument } from './session.interfaces';

export interface IUserInput {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IUserJWT {
  _id: IUserDocument['_id'];
  name: string;
  lastName: string;
  email: string;
  session: ISessionDocument['_id'];
}

export interface IUserDocument extends IUserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  emailVerified: boolean;
  phoneNumber?: string;
  avatar?: IAssetDocument;
  comparePassword(candidatePassword: string): Promise<boolean>;
  getFullName(): string;
}
