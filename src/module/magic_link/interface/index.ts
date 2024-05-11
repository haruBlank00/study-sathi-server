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

export type SendMagicLinkResponse = SuccessResponse | ErrorResponse;

export type VerifyMagicLinkResponse =
  | SuccessResponse<{
      tokens: {
        accessToken: string;
        refreshToken: string;
      };
    }>
  | ErrorResponse;

export interface MagicLinkServiceInterface {
  sendMagicLink({ email }: SendMagicLinkDto): Promise<SendMagicLinkResponse>;
  verifyMagicLink({
    email,
    token,
  }: VerifyMagicLinkDto): Promise<VerifyMagicLinkResponse>;
}
