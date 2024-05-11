import { ErrorResponse, SuccessResponse } from 'src/ts/interface';

export interface Tag {
  name: string;
  normalized: string;
  count: number;
}

export type CreateTagResponse =
  | SuccessResponse<{
      tags: Tag;
    }>
  | ErrorResponse;
