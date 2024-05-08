import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { EmailModule } from './module/email/email.module';
import { ExceptionsModule } from './module/exceptions/exceptions.module';
import { LoggerModule } from './module/logger/logger.module';
import { MagicLinkModule } from './module/magic_link/magic_link.module';
import { NDaysChallengeModule } from './module/n-days-challenge/n-days-challenge.module';
import { ThrottleModule } from './module/throttle/throttle.module';
import { UsersModule } from './module/users/users.module';
import { ChallengesModule } from './module/challenges/challenges.module';
import { TagsModule } from './module/tags/tags.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      dbName: 'study-sathi',
    }),
    AuthModule,
    UsersModule,
    EmailModule,
    NDaysChallengeModule,
    MagicLinkModule,
    ExceptionsModule,
    LoggerModule,
    ThrottleModule,
    ChallengesModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
