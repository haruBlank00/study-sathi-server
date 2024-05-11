import { Controller, Get } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Controller('logger')
export class LoggerController {
  constructor(private readonly logger: LoggerService) {}

  @Get('info')
  getInfoLog() {
    this.logger.log({
      message: 'This is an INFO log messafe from the LoggerController',
      context: 'LoggerController',
    });
    // const pie = 44;
    // const name = 'john';
    // name;
    return 'Logged an Info message.';
  }

  @Get('error')
  getErrorLog() {
    this.logger.error({
      message: 'This is an error log message from the LoggerController',
      context: null,
      trace: 'LoggerController',
    });
    return 'Logged an ERROR message.';
  }
}
