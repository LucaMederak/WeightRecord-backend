import mongoose from 'mongoose';
import { IClientDocument } from '@interfaces/client.interfaces';

const Schema = mongoose.Schema;

const ClientSchema = new Schema<IClientDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    firstName: { type: String, required: true },
    surname: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    email: { type: String },
    phoneNumber: { type: String },
    street: { type: String },
    zipCode: { type: String },
    city: { type: String },
    notes: { type: String },
    diseases: [{ type: String }],
    alergens: [{ type: String }],
    expectedBodyWeight: { type: Number },
    specificAims: [{ type: String }],
    pal: { type: Number },
  },
  {
    timestamps: true,
  }
);

const ClientModel = mongoose.model<IClientDocument>('Client', ClientSchema);

export default ClientModel;
