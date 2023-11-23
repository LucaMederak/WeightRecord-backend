import mongoose from 'mongoose';
import { ITrainingUnitStageDocument } from '@interfaces/training/trainingUnit/trainingUnitStage.interfaces';

const Schema = mongoose.Schema;

const TrainingUnitStageSchema = new Schema<ITrainingUnitStageDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    trainingUnit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TrainingUnit',
      required: true,
    },
    name: { type: String, required: true },
    type: { type: String, required: true, enum: ['warmUp', 'mainTraining'] },
    order: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const TrainingUnitStageModel = mongoose.model<ITrainingUnitStageDocument>(
  'TrainingUnitStage',
  TrainingUnitStageSchema
);

export default TrainingUnitStageModel;
