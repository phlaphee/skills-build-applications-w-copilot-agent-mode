import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
  },
  { timestamps: true },
);

export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;

const Workout = mongoose.model<WorkoutDocument>('Workout', workoutSchema);

export default Workout;
