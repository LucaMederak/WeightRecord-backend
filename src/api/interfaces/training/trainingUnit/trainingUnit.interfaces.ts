import mongoose from 'mongoose';
import { ITrainingPlanDocument } from '../trainingPlan.interfaces';
import { IUserDocument } from '../../user.interfaces';

export interface ITrainingUnitInput {
  user: IUserDocument['_id'];
  name: string;
  trainingPlan: ITrainingPlanDocument['_id'];
}

export interface ITrainingUnitDocument
  extends ITrainingUnitInput,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
