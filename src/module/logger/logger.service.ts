import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import * as winstonMongoDB from 'winston-mongodb';
// import { logger } from './winston.config';

@Injectable()
export class LoggerService {
  logger: winston.Logger;
  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [
        /* 
        - winston will log our logo based on how we have instructed it.
        - By default, logs are recored in JSON format
          
        {
            "context":"NotFoundExceptionFilter",
            "level":"error",
            "message":"404 Error: Cannot GET /itemst"
        }
        */
        // this logger logs on our console
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(), // add a timestamp to our logs
            winston.format.colorize(), // add colors
            winston.format.printf(
              ({ timestamp, level, message, context, trace }) => {
                // Print the log in  this format
                // 2023-09-27T17:40:14.578Z [NotFoundExceptionFilter] error: 404 Error: Cannot GET /itemst
                return `${timestamp} [${context}] ${level}: ${message}${trace ? `\n${trace}` : ''}`;
              },
            ),
          ),
        }),

        /*
        - This logger logs to a file -> record our log to file
        - Winston will use `DailyRotateFile` to create a log file
        - `logs/application-%DATE%.log` will be the filename
        - i.e. `application-2023-09-27.log`
        - creating a new log each day
        */
        new winston.transports.DailyRotateFile({
          filename: 'logs/application-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),

        new winstonMongoDB.MongoDB({
          level: 'info',
          db: process.env.MONGO_URL,
          dbName: 'study-sathi',
          options: {
            useUnifiedTopology: true,
          },
          collection: 'logs',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
      ],
    });
  }
  log({ message, context }: { message: string; context?: any }) {
    this.logger.info(message, { context });
  }

  error({
    message,
    context,
    trace,
  }: {
    message: string;
    context?: string;
    trace: string;
  }) {
    this.logger.error(message, { context, trace });
  }

  warn({ message, context = '' }: { message: string; context?: string }) {
    this.logger.warn(message, { context });
  }

  debug({ message, context }: { message: string; context?: any }) {
    this.logger.debug(message, { context });
  }
}
