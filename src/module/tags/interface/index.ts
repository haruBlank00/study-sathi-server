import { ErrorResponse, SuccessResponse } from 'src/ts/interface';

export interface TagDocument extends Document {
  name: string;
  normalized: string;
  count: number;
}

export type CreateTagResponse =
  | SuccessResponse<{
      tags: any;
    }>
  | ErrorResponse<{ message: string }>;
