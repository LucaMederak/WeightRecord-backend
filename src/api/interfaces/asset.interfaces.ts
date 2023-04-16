import mongoose from 'mongoose';
import { IUserDocument } from './user.interfaces';

export interface IMainImage {
  order: number;
  asset: IAssetDocument['_id'];
}

export interface IAssetInput {
  user: IUserDocument['_id'];
  title: string;
  description?: string;
  url: string;
  type: string;
  size: number;
  key: string;
  provider: 'AWS_S3' | 'GCLOUD_STORAGE';
}

export interface IAssetDocument extends IAssetInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
