import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TagsService } from '../tags/tags.service';
import { CHALLENGES_MODEL } from './constants';
import { CreateChallengeDto } from './dto/create';
import {
  ChallengeDocument,
  CreateChallengeResponse,
  DeleteChallengeResponse,
  GetChallengeResponse,
  GetChallengesResponse,
  PatchChallengeResponse,
} from './interface';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel(CHALLENGES_MODEL)
    private challengeModel: Model<ChallengeDocument>,

    private tagsService: TagsService,
  ) {}
  async createChallenge(
    data: CreateChallengeDto,
  ): Promise<CreateChallengeResponse> {
    const { tags, ...rest } = data;

    const tagsResult = await this.tagsService.createTag({
      tags: tags,
    });
    if (!tagsResult.success) {
      return {
        success: false,
        data: null,
        error: {
          message: tagsResult.error.message,
        },
      };
    }

    try {
      const challenge = await this.challengeModel.create({
        ...rest,
        tags: tagsResult.data.tags,
      });

      return {
        success: true,
        data: {
          message: 'Challenge created successfully.',
          challenge,
        },
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

  async getChallenge(challengeId: string): Promise<GetChallengeResponse> {
    try {
      const challenge = await this.challengeModel
        .findOne({
          _id: challengeId,
        })
        .populate('tags');

      if (!challenge) {
        return {
          success: false,
          data: null,
          error: {
            message: 'Challenge not found.',
          },
        };
      }

      return {
        success: true,
        data: {
          message: 'Challenge fetched successfully.',
          challenge,
        },
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

  async patchChallenge(
    challengeId: string,
    body: Partial<CreateChallengeDto>,
  ): Promise<PatchChallengeResponse> {
    try {
      const challenge = await this.challengeModel
        .findByIdAndUpdate(
          {
            _id: challengeId,
          },
          {
            $set: body,
          },
        )
        .populate('tags');

      if (!challenge) {
        return {
          success: false,
          data: null,
          error: {
            message: "Challenge doesn't exist.",
          },
        };
      }
      return {
        success: true,
        data: {
          challenge,
          message: 'Challenge updated successfully.',
        },
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

  async deleteChallenge(challengeId: string): Promise<DeleteChallengeResponse> {
    try {
      const challenge = await this.challengeModel.findOneAndDelete({
        _id: challengeId,
      });

      if (!challenge) {
        return {
          success: false,
          data: null,
          error: {
            message: 'Challenge not found.',
          },
        };
      }

      return {
        success: true,
        data: {
          challenge,
          message: 'Challenge deleted successfully.',
        },
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

  async getChallenges(): Promise<GetChallengesResponse> {
    try {
      const challenges = await this.challengeModel.find({}).populate('tags');
      return {
        success: true,
        data: {
          message: 'Challenges fetched successfully.',
          challenges,
        },
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
