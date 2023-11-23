import mongoose from 'mongoose';
import { ITrainingExerciseDocument } from '@interfaces/training/trainingUnit/trainingExercise/trainingExercise.interfaces';

const Schema = mongoose.Schema;

const TrainingExerciseSchema = new Schema<ITrainingExerciseDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    trainingUnitStage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TrainingUnitStage',
      required: true,
    },
    exercise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise',
      required: true,
    },
    name: { type: String, required: true },
    order: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const TrainingExerciseModel = mongoose.model<ITrainingExerciseDocument>(
  'TrainingExercise',
  TrainingExerciseSchema
);

export default TrainingExerciseModel;
