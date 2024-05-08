import { Document } from 'mongoose';
import { SendMagicLinkDto } from '../dto/send';
import { ErrorResponse, SuccessResponse } from 'src/ts/interface';
import { VerifyMagicLinkDto } from '../dto/verify.dto';

export interface MagicLinkDocument extends Document {
  userId: string;
  readonly createdAt: Date;
  readonly token: string;
  expirationDate: string;
  hasBeenUsed: boolean;
}

export type SendMagicLinkResponse =
  | SuccessResponse<{
      message: string;
    }>
  | ErrorResponse<{ message: string }>;

export type VerifyMagicLinkResponse =
  | SuccessResponse<{
      accessToken: string;
      refreshToken: string;
    }>
  | ErrorResponse<{
      message: string;
    }>;

export interface MagicLinkServiceInterface {
  sendMagicLink({ email }: SendMagicLinkDto): Promise<SendMagicLinkResponse>;
  verifyMagicLink({
    email,
    token,
  }: VerifyMagicLinkDto): Promise<VerifyMagicLinkResponse>;
}
