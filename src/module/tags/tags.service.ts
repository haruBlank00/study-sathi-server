import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TAGS_MODEL } from './constants';
import { CreateTagDto } from './dto/create';
import { CreateTagResponse, TagDocument } from './interface';

@Injectable()
export class TagsService {
  constructor(@InjectModel(TAGS_MODEL) private tagModel: Model<TagDocument>) {}

  async createTag(data: CreateTagDto): Promise<CreateTagResponse> {
    try {
      const { tags } = data;
      const tagsFilter = tags.map((tag) => {
        return {
          tag,
          normalized: tag.slice(1).toLowerCase(),
        };
      });
      const bulkOps = tagsFilter.map((tag) => {
        return {
          updateOne: {
            filter: {
              tag: tag.tag,
              normalized: tag.normalized,
            },
            update: {
              $inc: {
                count: 1,
              },
            },
            upsert: true,
          },
        };
      });
      await this.tagModel.bulkWrite(bulkOps);
      const upsertedTagas = await this.tagModel.find({
        $or: tagsFilter,
      });
      console.log({ upsertedTagas });
      return {
        success: true,
        data: { tags: upsertedTagas },
        error: null,
      };
    } catch (e) {
      return {
        success: false,
        data: null,
        error: {
          message: e.message,
        },
      };
    }
  }
}
