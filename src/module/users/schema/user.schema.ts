import * as mongoose from 'mongoose';
import { CHALLENGES_MODEL } from 'src/module/challenges/constants';
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

  challenges: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: CHALLENGES_MODEL,
    },
  ],
});
