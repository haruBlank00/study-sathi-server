import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from '../logger/logger.service';
import { ValidationError } from 'class-validator';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (exception instanceof BadRequestException) {
      const validationErrors = exception.getResponse() as {
        message: string[];
      };

      console.log({ validationErrors, cons: validationErrors?.message });

      return response.status(status).json({
        statusCode: status,
        success: false,
        error: {
          messsage: validationErrors.message,
          name: 'ValidationError',
        },
      });
    }

    const { message, name, stack } = exception;
    const errorMessage = message || 'Internal server error';
    const errrrror = {
      message: errorMessage,
      name,
      stack,
    };

    this.logger.error({
      message: errorMessage,
      trace: name,
      context: stack,
    });

    response.status(status).json({
      statusCode: status,
      success: false,
      error: errrrror,
    });
  }
}
