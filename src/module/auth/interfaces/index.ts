import mongoose from 'mongoose';
import { AuthSchema } from '../schemas/auth.schema';

export type AuthDocument = mongoose.Document & typeof AuthSchema;
