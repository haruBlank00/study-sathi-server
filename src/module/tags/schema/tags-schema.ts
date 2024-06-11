import * as mongoose from 'mongoose';

export const TagSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: true,
    unique: true,
  },
  normalized: {
    type: String,
    required: true,
    unique: true,
  },
  count: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  ops: {
    type: {
      key: String,
      value: String,
    },
  },
});

TagSchema.index({ tag: 1 });
TagSchema.index({ normalized: 1 });
