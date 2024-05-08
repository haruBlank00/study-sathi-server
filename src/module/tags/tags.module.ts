import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TAGS_MODEL } from './constants';
import { TagSchema } from './schema/tags-schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TAGS_MODEL,
        schema: TagSchema,
      },
    ]),
  ],
  providers: [TagsService],
  exports: [
    TagsService,
    MongooseModule.forFeature([
      {
        name: TAGS_MODEL,
        schema: TagSchema,
      },
    ]),
  ],
})
export class TagsModule {}
