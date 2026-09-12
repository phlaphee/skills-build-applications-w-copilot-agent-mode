import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    team: { type: String, required: true },
    workoutsCompleted: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type UserDocument = InferSchemaType<typeof userSchema>;

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
