import mongoose from 'mongoose';

type Token = {
  access: string;
  refresh: string;
};
export interface Auth {
  userId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  token: Token;
}
