import * as mongoose from 'mongoose';

export const AuthSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  token: {
    access: {
      type: String,
    },
    refresh: {
      type: String,
    },
  },
  blacklisted: Boolean,
});
