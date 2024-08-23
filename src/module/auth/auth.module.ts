import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { authGuardProviders } from './auth.providers';
import { AuthService } from './auth.service';
import { AUTH_MODEL } from './constants';
import { AuthSchema } from './schemas/auth.schema';
import { MagicLinkModule } from '../magic_link/magic_link.module';
import { GitHubStrategy } from './OAuth /passport/github.strategy';
import { AuthProviderEnum } from './auth.enum';
import { MagicLinkService } from '../magic_link/magic_link.service';
import { USER_MODEL } from '../users/constants';
import { UserSchema } from '../users/schema/user.schema';
import { MAGIC_LINK_MODEL } from '../magic_link/constants';
import { MagicLinkSchema } from '../magic_link/schema/magic-link.schema';
import { EmailModule } from '../email/email.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AUTH_MODEL,
        schema: AuthSchema,
      },
      {
        name: MAGIC_LINK_MODEL,
        schema: MagicLinkSchema,
      },
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,

      // signOptions: {
      //   expiresIn: '60s',
      // },
    }),
    MagicLinkModule,
    PassportModule.register({
      defaultStrategy: [AuthProviderEnum.GITHUB],
      session: false,
    }),
    EmailModule,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    MagicLinkService,
    GitHubStrategy,
    ...authGuardProviders,
  ],
})
export class AuthModule {}
