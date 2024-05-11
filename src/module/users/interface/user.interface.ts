import { Document } from 'mongoose';
import { Challenge } from 'src/module/challenges/interface';
import { MagicLinkDocument } from 'src/module/magic_link/interface';

export interface User extends Document {
  readonly createdAt: Date;
  readonly name: string;
  readonly email: string;
  readonly magicLink: MagicLinkDocument[];
  readonly challenges: Challenge[];
}
