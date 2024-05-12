import mongoose from 'mongoose';
import { ErrorResponse, SuccessResponse } from 'src/ts/interface';

export interface Tag {
  name: string;
  normalized: string;
  count: number;
  _id: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}

export type CreateTagResponse =
  | SuccessResponse<{
      tags: Tag[];
    }>
  | ErrorResponse;
