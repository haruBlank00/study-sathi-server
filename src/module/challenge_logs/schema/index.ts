import mongoose from 'mongoose';
import { CHALLENGES_MODEL } from 'src/module/challenges/constants';

export const LogSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
  challenge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: CHALLENGES_MODEL,
    required: true,
  },
});

LogSchema.pre('save', async function (next) {
  console.log('logginggggg', this._id, this.challenge);
  if (this.isNew) {
    try {
      const challengeModel = this.model(CHALLENGES_MODEL);
      await challengeModel.findByIdAndUpdate(
        this.challenge,
        { $push: { logs: this._id } },
        { new: true, useFindAndModify: false },
      );
      next();
    } catch (err) {
      console.log('err', err);
      next(err);
    }
  } else {
    next();
  }
});
