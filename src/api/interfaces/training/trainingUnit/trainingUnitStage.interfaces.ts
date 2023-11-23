import mongoose from 'mongoose';
import { ITrainingUnitDocument } from './trainingUnit.interfaces';
import { IUserDocument } from '../../user.interfaces';

export interface ITrainingUnitStageInput {
  user: IUserDocument['_id'];
  name: string;
  type: 'warmUp' | 'mainTraining';
  order: number;
  trainingUnit: ITrainingUnitDocument['_id'];
}

export interface ITrainingUnitStageDocument
  extends ITrainingUnitStageInput,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
