import mongoose from 'mongoose';
import { IAssetDocument } from './asset.interfaces';
import { IUserDocument } from './user.interfaces';

interface IExerciseInstructionItem {
  order: number;
  description: string;
}

export interface IExerciseInput {
  user: IUserDocument['_id'];
  name: string;
  description?: string;
  image?: IAssetDocument['_id'];
  instruction?: IExerciseInstructionItem[];
  video?: {
    type: 'link' | 'asset';
    link?: string;
    asset?: IAssetDocument['_id'];
  };
  alternativeNames?: string[];
  attachments?: IAssetDocument['_id'][];
}

export interface IExerciseDocument extends IExerciseInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
