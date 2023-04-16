import mongoose from 'mongoose';
import { IAssetDocument } from '@interfaces/asset.interfaces';

const Schema = mongoose.Schema;

const AssetSchema = new Schema<IAssetDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String },
    url: { type: String, required: true },
    size: { type: Number, required: true },
    key: { type: String, required: true },
    type: { type: String, required: true },
    provider: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const AssetModel = mongoose.model<IAssetDocument>('Asset', AssetSchema);

export default AssetModel;
