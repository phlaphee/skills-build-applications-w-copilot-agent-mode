import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: String, required: true },
    type: { type: String, required: true },
    distanceKm: { type: Number, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true },
);

export type ActivityDocument = InferSchemaType<typeof activitySchema>;

const Activity = mongoose.model<ActivityDocument>('Activity', activitySchema);

export default Activity;
