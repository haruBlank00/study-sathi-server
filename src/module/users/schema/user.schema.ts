import * as mongoose from 'mongoose';
import { MAGIC_LINK_MODEL } from 'src/module/magic_link/constants';

export const UserSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
  },
  email: String,

  magicLink: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: MAGIC_LINK_MODEL,
    },
  ],
});
