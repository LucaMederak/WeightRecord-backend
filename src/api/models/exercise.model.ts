import mongoose from 'mongoose';
import { IExerciseDocument } from '@interfaces/exercise.interfaces';

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema<IExerciseDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String },
    image: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset' },
    instruction: [
      {
        order: { type: Number, required: true },
        description: { type: String, required: true },
      },
    ],
    video: {
      type: { type: String, required: true, enum: ['link', 'asset'] },
      link: {
        type: String,
      },
      asset: { type: String },
    },
    attachments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Asset' }],
  },
  {
    timestamps: true,
  }
);

const ExerciseModel = mongoose.model<IExerciseDocument>(
  'Exercise',
  ExerciseSchema
);

export default ExerciseModel;
