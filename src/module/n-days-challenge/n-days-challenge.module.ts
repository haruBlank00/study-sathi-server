import { Module } from '@nestjs/common';
import { NDaysChallengeService } from './n-days-challenge.service';
import { NDaysChallengeController } from './n-days-challenge.controller';

@Module({
  providers: [NDaysChallengeService],
  controllers: [NDaysChallengeController],
})
export class NDaysChallengeModule {}
