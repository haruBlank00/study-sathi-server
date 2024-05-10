import { Document } from 'mongoose';
import { ChallengeDocument } from 'src/module/challenges/interface';
import { MagicLinkDocument } from 'src/module/magic_link/interface';

export interface UserDocument extends Document {
  readonly createdAt: Date;
  readonly name: string;
  readonly email: string;
  readonly magicLink: MagicLinkDocument[];
  readonly challenges: ChallengeDocument[];
}
