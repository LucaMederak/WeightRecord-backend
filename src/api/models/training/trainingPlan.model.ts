import mongoose from 'mongoose';
import { ITrainingPlanDocument } from '@interfaces/training/trainingPlan.interfaces';

const Schema = mongoose.Schema;

const TrainingPlanSchema = new Schema<ITrainingPlanDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    template: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const TrainingPlanModel = mongoose.model<ITrainingPlanDocument>(
  'TrainingPlan',
  TrainingPlanSchema
);

export default TrainingPlanModel;
