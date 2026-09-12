import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    rank: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    points: { type: Number, required: true },
  },
  { timestamps: true },
);

export type LeaderboardEntryDocument = InferSchemaType<typeof leaderboardEntrySchema>;

const LeaderboardEntry = mongoose.model<LeaderboardEntryDocument>('LeaderboardEntry', leaderboardEntrySchema);

export default LeaderboardEntry;
