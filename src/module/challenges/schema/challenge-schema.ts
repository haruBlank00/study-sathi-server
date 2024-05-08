import * as mongoose from 'mongoose';
import { TAGS_MODEL } from 'src/module/tags/constants';

export const ChallengeSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  days: {
    type: Number,
    required: true,
  },
  privacy: {
    type: String,
    enum: ['public', 'private', 'group'],
    default: 'public',
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: TAGS_MODEL,
    },
  ],
});
