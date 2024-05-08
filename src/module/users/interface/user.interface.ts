import { Document } from 'mongoose';
import { MagicLinkDocument } from 'src/module/magic_link/interface';

export interface UserDocument extends Document {
  readonly createdAt: Date;
  readonly name: string;
  readonly email: string;
  readonly magicLink: MagicLinkDocument[];
}
