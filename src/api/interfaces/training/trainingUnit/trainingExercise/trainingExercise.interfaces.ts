import mongoose from 'mongoose';
import { IUserDocument } from '../../../user.interfaces';
import { ITrainingUnitStageDocument } from '../trainingUnitStage.interfaces';
import { IExerciseDocument } from '@interfaces/exercise.interfaces';

export interface ITrainingExerciseInput {
  user: IUserDocument['_id'];
  name: string;
  order: number;
  trainingUnitStage: ITrainingUnitStageDocument['_id'];
  exercise: IExerciseDocument['_id'];
}

export interface ITrainingExerciseDocument
  extends ITrainingExerciseInput,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
