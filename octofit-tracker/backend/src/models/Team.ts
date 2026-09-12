import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    members: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type TeamDocument = InferSchemaType<typeof teamSchema>;

const Team = mongoose.model<TeamDocument>('Team', teamSchema);

export default Team;
