import { Module } from '@nestjs/common';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LOG_MODEL } from './constants';
import { LogSchema } from './schema';
import { ChallengesModule } from '../challenges/challenges.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: LOG_MODEL,
        schema: LogSchema,
      },
    ]),
    ChallengesModule,
  ],
  controllers: [LogsController],
  providers: [LogsService],
})
export class LogsModule {}
