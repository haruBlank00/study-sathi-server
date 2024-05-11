import mongoose from 'mongoose';
import { ErrorResponse, SuccessResponse } from 'src/ts/interface';

export interface Challenge {
  createdAt: Date;
  name: string;
  description: string;
  days: number;
  privacy: string;
  tags: string[];
  userId: { type: typeof mongoose.Schema.Types.ObjectId; ref: string };
}

export type CreateChallengeResponse =
  | SuccessResponse<{ challenge: Challenge }>
  | ErrorResponse;

export type GetChallengeResponse =
  | SuccessResponse<{
      challenge: Challenge;
    }>
  | ErrorResponse;

export type PatchChallengeResponse =
  | SuccessResponse<{
      challenge: Challenge;
    }>
  | ErrorResponse;

export type DeleteChallengeResponse =
  | SuccessResponse<{
      challenge: Challenge;
    }>
  | ErrorResponse;

export type GetChallengesResponse =
  | SuccessResponse<{
      challenges: Challenge[];
    }>
  | ErrorResponse;
