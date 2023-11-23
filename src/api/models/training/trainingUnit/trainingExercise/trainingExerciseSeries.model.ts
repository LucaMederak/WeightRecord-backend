import mongoose from 'mongoose';
import { ITrainingExerciseSeriesDocument } from '@interfaces/training/trainingUnit/trainingExercise/trainingExerciseSeries.interfaces';

const Schema = mongoose.Schema;

const TrainingExerciseSeriesSchema =
  new Schema<ITrainingExerciseSeriesDocument>(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      trainingExercise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TrainingExercise',
        required: true,
      },
      name: { type: String, required: true },
      order: { type: Number, required: true },
      repetitionsNumber: { type: Number, required: true },
      load: { type: Number, required: true },
      tempo: { type: Number },
    },
    {
      timestamps: true,
    }
  );

const TrainingExerciseSeriesModel =
  mongoose.model<ITrainingExerciseSeriesDocument>(
    'TrainingExerciseSeries',
    TrainingExerciseSeriesSchema
  );

export default TrainingExerciseSeriesModel;
