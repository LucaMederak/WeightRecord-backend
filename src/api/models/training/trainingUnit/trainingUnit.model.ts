import mongoose from 'mongoose';
import { ITrainingUnitDocument } from '@interfaces/training/trainingUnit/trainingUnit.interfaces';

const Schema = mongoose.Schema;

const TrainingUnitSchema = new Schema<ITrainingUnitDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    trainingPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TrainingPlan',
      required: true,
    },
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const TrainingUnitModel = mongoose.model<ITrainingUnitDocument>(
  'TrainingUnit',
  TrainingUnitSchema
);

export default TrainingUnitModel;
