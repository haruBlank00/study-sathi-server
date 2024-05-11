import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TagsService } from '../tags/tags.service';
import { CHALLENGES_MODEL } from './constants';
import { CreateChallengeDto } from './dto/create';
import {
  Challenge,
  CreateChallengeResponse,
  DeleteChallengeResponse,
  GetChallengeResponse,
  GetChallengesResponse,
  PatchChallengeResponse,
} from './interface';
import { USER_MODEL } from 'src/module/users/constants';
import { User } from 'src/module/users/interface/user.interface';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel(CHALLENGES_MODEL)
    private challengeModel: Model<Challenge>,
    @InjectModel(USER_MODEL) private userModel: Model<User>,

    private tagsService: TagsService,
  ) {}
  async createChallenge(
    data: CreateChallengeDto,
    email: string | string[],
  ): Promise<CreateChallengeResponse> {
    const { tags, ...rest } = data;

    const tagsResult = await this.tagsService.createTag({
      tags: tags,
    });
    if (!tagsResult.success) {
      return {
        success: false,
        message: tagsResult.error.message,
      };
    }

    try {
      const challenge = await this.challengeModel.create({
        ...rest,
        tags: tagsResult.data.tags,
      });

      const user = await this.userModel.findOne({ email });
      challenge.userId = user._id;
      challenge.save();

      // const user = await this.userModel.findOneAndUpdate(
      //   { email },
      //   { $push: { challenges: { ...rest, tags: tagsResult.data.tags } } },
      //   { new: true, upsert: true },
      // );
      return {
        success: true,
        message: 'Challenge created successfully.',
        data: {
          challenge,
        },
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
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
          message: 'Challenge not found.',
          success: false,
        };
      }

      return {
        success: true,
        message: 'Challenge fetched successfully.',
        data: {
          challenge,
        },
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
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
          message: "Challenge doesn't exist.",
        };
      }
      return {
        success: true,
        message: 'Challenge updated successfully.',
        data: {
          challenge,
        },
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
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
          message: 'Challenge not found.',
        };
      }

      return {
        success: true,
        message: 'Challenge deleted successfully.',
        data: {
          challenge,
        },
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }

  async getChallenges(): Promise<GetChallengesResponse> {
    try {
      const challenges = await this.challengeModel.find({}).populate('tags');
      return {
        success: true,
        message: 'Challenges fetched successfully.',
        data: {
          challenges,
        },
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }
}
