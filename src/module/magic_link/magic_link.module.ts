import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailModule } from 'src/module/email/email.module';
import { UsersModule } from '../users/users.module';
import { MAGIC_LINK_MODEL } from './constants';
import { MagicLinkController } from './magic_link.controller';
import { MagicLinkService } from './magic_link.service';
import { MagicLinkSchema } from './schema/magic-link.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MAGIC_LINK_MODEL,
        schema: MagicLinkSchema,
      },
    ]),
    UsersModule,
    EmailModule,
  ],
  controllers: [MagicLinkController],
  providers: [MagicLinkService],
  exports: [],
})
export class MagicLinkModule {}
