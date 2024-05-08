import * as mongoose from 'mongoose';
import { USER_MODEL } from 'src/module/users/constants';

export const MagicLinkSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  token: {
    type: String,
  },
  expirationDate: {
    type: Date,
    default: () => {
      const tokenExpirationTime = 20; // minutes
      const now = new Date();
      const currentMinutes = now.getMinutes();
      const expirationDate = now.setMinutes(
        currentMinutes + tokenExpirationTime,
      );
      return expirationDate;
    },
  },
  hasBeenUsed: {
    type: Boolean,
    default: false,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: USER_MODEL,
  },
});
