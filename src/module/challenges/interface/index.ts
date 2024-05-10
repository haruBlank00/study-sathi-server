import { Document } from 'mongoose';
import { ErrorResponse, SuccessResponse } from 'src/ts/interface';

export interface ChallengeDocument extends Document {
  name: string;
  description: string;
  days: number;
  privacy: string;
  tags: string[];
  userId: string;
}

export type CreateChallengeResponse =
  | SuccessResponse<{
      message: string;
      challenge: ChallengeDocument;
    }>
  | ErrorResponse<{ message: string }>;

export type GetChallengeResponse =
  | SuccessResponse<{
      message: string;
      challenge: ChallengeDocument;
    }>
  | ErrorResponse<{ message: string }>;

export type PatchChallengeResponse =
  | SuccessResponse<{
      message: string;
      challenge: ChallengeDocument;
    }>
  | ErrorResponse<{ message: string }>;

export type DeleteChallengeResponse =
  | SuccessResponse<{
      message: string;
      challenge: ChallengeDocument;
    }>
  | ErrorResponse<{ message: string }>;

export type GetChallengesResponse =
  | SuccessResponse<{
      message: string;
      challenges: ChallengeDocument[];
    }>
  | ErrorResponse<{ message: string }>;
