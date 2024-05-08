import {
  SESClient,
  SESServiceException,
  SendEmailCommand,
} from '@aws-sdk/client-ses';
import { Injectable, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/module/exceptions/http-exception.filter';
import { LoggerService } from 'src/module/logger/logger.service';
import {
  EmailProps,
  EmailServiceInterface,
  SendEmailResponse,
} from './interface';

@UseFilters(HttpExceptionFilter)
@Injectable()
export class EmailService implements EmailServiceInterface {
  private sesClient: SESClient;
  constructor(private readonly logger: LoggerService) {
    console.log(process.env.SES_ACCESS_KEY, 'ACCESSK YE');
    this.sesClient = new SESClient({
      region: 'us-east-1',
      credentials: {
        accessKeyId: process.env.SES_ACCESS_KEY,
        secretAccessKey: process.env.SES_SECRET_KEY,
      },
    });
  }

  private createSendEmailCommand({
    CcAddresses,
    ToAddresses,
    Source,
    Data,
  }: EmailProps) {
    try {
      return new SendEmailCommand({
        Destination: {
          /* required */
          CcAddresses,
          ToAddresses,
        },
        Message: {
          /* required */
          Body: {
            /* required */
            Html: {
              Charset: 'UTF-8',
              Data,
            },
            Text: {
              Charset: 'UTF-8',
              Data: 'TEXT_FORMAT_BODY',
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: 'EMAIL_SUBJECT',
          },
        },
        Source,
        ReplyToAddresses: [
          /* more items */
        ],
      });
    } catch (error) {
      console.log('error happend');
    }
  }

  async sendEmail({
    CcAddresses,
    ToAddresses,
    Source,
    Data,
  }: EmailProps): SendEmailResponse {
    try {
      const response = await this.sesClient.send(
        this.createSendEmailCommand({
          CcAddresses,
          ToAddresses,
          Source,
          Data,
        }),
      );
      return {
        error: null,
        success: true,
        data: {
          message: 'Email sent successfully.',
          id: response.MessageId,
        },
      };
    } catch (e) {
      if (e instanceof SESServiceException) {
        this.logger.error({
          message: e.message,
          context: e.name,
          trace: e.stack,
        });
        return {
          data: null,
          success: false,
          error: {
            message: e.message,
          },
        };
      }
      console.log({ e });
      console.log('what');
      return {
        data: null,
        success: false,
        error: {
          message: e.message,
        },
      };
    }
  }
}
