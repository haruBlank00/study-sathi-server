import { Module } from '@nestjs/common';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LOG_MODEL } from './constants';
import { LogSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: LOG_MODEL,
        schema: LogSchema,
      },
    ]),
  ],
  controllers: [LogsController],
  providers: [LogsService],
})
export class LogsModule {}
