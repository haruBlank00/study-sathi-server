export interface ErrorResponse {
  success: false;
  // error: T;
  message: string;
}

export type SuccessResponse<T = any> = {
  data: T;
  success: true;
  message: string;
};
