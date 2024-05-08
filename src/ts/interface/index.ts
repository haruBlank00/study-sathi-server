export interface ErrorResponse<T> {
  success: false;
  error: T;
  data: null;
}

export interface SuccessResponse<T> {
  success: true;
  data: T;
  error: null;
}
