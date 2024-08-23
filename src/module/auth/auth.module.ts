import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { authGuardProviders } from './auth.providers';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AUTH_MODEL } from './constants';
import { AuthSchema } from './schemas/auth.schema';
import { MagicLinkModule } from '../magic_link/magic_link.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AUTH_MODEL,
        schema: AuthSchema,
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
  ],
  controllers: [AuthController],
  providers: [AuthService, ...authGuardProviders],
})
export class AuthModule {}
