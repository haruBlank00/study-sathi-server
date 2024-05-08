import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class CustomMessageThrottler extends ThrottlerGuard {
  protected errorMessage: string =
    "Relax and breath. Don't throttle me plzzzz. :( ";
}
