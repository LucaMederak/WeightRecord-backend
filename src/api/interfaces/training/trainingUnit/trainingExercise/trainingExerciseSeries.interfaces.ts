import mongoose from 'mongoose';
import { IUserDocument } from '../../../user.interfaces';
import { ITrainingExerciseDocument } from './trainingExercise.interfaces';

export interface ITrainingExerciseSeriesInput {
  user: IUserDocument['_id'];
  trainingExercise: ITrainingExerciseDocument['_id'];
  name: string;
  order: number;
  repetitionsNumber: number; //reps
  load: number; //kg
  tempo?: number;
}

export interface ITrainingExerciseSeriesDocument
  extends ITrainingExerciseSeriesInput,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
