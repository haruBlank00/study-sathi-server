import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dto/create';

@Controller('challenges')
export class ChallengesController {
  constructor(private challengesService: ChallengesService) {}

  @Post()
  async createChallenge(@Body() body: CreateChallengeDto) {
    const { data, error, success } =
      await this.challengesService.createChallenge(body);

    if (!success) {
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }

    return {
      success: true,
      data,
    };
  }

  @Get(':challengeId')
  async getChallenge(@Param('challengeId') challengeId: string) {
    const { data, error, success } =
      await this.challengesService.getChallenge(challengeId);

    if (!success) {
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
    return {
      success: true,
      data,
    };
  }

  @Patch(':challengeId')
  async patchChallenge(
    @Param('challengeId') challengeId: string,
    @Body() body: Partial<CreateChallengeDto>,
  ) {
    const { success, data, error } =
      await this.challengesService.patchChallenge(challengeId, body);

    if (!success) {
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }

    return {
      success: true,
      data,
    };
  }

  @Delete(':challengeId')
  async deleteChallenge(@Param('challengeId') challengeId: string) {
    const { data, error, success } =
      await this.challengesService.deleteChallenge(challengeId);

    if (!success) {
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }

    return {
      success: true,
      data,
      error: null,
    };
  }

  @Get()
  async getChallenges() {
    const { data, error, success } =
      await this.challengesService.getChallenges();

    if (!success) {
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }

    return {
      success: true,
      data,
      error: null,
    };
  }
}
