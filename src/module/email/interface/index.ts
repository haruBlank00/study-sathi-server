import { ErrorResponse, SuccessResponse } from 'src/ts/interface';

export interface EmailServiceInterface {
  sendEmail(props: EmailProps): SendEmailResponse;
}

export interface EmailProps {
  CcAddresses: string[];
  ToAddresses: string[];
  Source: string;
  Data: string;
}

export type SendEmailResponse = Promise<
  | SuccessResponse<{
      message: string;
      id: string;
    }>
  | ErrorResponse<{
      message: string;
    }>
>;
