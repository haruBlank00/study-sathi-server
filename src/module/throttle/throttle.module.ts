import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { CustomMessageThrottler } from './CustomMessageThrottler';

@Module({
  imports: [ThrottlerModule.forRoot()],
  providers: [
    {
      provide: APP_GUARD,
      useClass: CustomMessageThrottler,
    },
  ],
})
export class ThrottleModule {}
