import * as mongoose from 'mongoose';
import { ErrorResponse, SuccessResponse } from 'src/ts/interface';

export interface Log {
  _id: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  content: string;
  day: number;
  challenge: { type: typeof mongoose.Schema.Types.ObjectId; ref: string };
}

export type CreateLogResponse =
  | SuccessResponse<{
      log: Log;
    }>
  | ErrorResponse;

export type GetLogsResponse =
  | SuccessResponse<{
      logs: Log[];
    }>
  | ErrorResponse;

export type GetLogResponse =
  | SuccessResponse<{
      log: Log;
    }>
  | ErrorResponse;
