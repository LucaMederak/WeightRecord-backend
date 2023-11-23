import mongoose from 'mongoose';
import { IUserDocument } from '../user.interfaces';

export interface ITrainingPlanInput {
  user: IUserDocument['_id'];
  name: string;
  template: boolean;
}

export interface ITrainingPlanDocument
  extends ITrainingPlanInput,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
