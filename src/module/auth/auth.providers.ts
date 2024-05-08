import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

export const authGuardProviders = [
  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
];
