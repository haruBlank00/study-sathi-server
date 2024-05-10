import { Module } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { ChallengesController } from './challenges.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CHALLENGES_MODEL } from './constants';
import { ChallengeSchema } from './schema/challenge-schema';
import { TagsModule } from 'src/module/tags/tags.module';
import { TagsService } from 'src/module/tags/tags.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CHALLENGES_MODEL,
        schema: ChallengeSchema,
      },
    ]),
    TagsModule,
    UsersModule,
  ],
  providers: [ChallengesService, TagsService],
  controllers: [ChallengesController],
})
export class ChallengesModule {}
