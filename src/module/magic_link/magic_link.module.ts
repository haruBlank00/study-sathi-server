import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailModule } from 'src/module/email/email.module';
import { MAGIC_LINK_MODEL } from './constants';
import { MagicLinkSchema } from './schema/magic-link.schema';
import { MagicLinkController } from './magic_link.controller';
import { MagicLinkService } from './magic_link.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
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
  providers: [MagicLinkService, UsersService],
  exports: [],
})
export class MagicLinkModule {}
