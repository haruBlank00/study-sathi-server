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
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dto/create';
import { Request, Response } from 'express';

interface ExtendedRequest extends Request {
  user: {
    email: string;
  };
}

@Controller('challenges')
export class ChallengesController {
  constructor(private challengesService: ChallengesService) {}

  @Post()
  async createChallenge(
    @Body() body: CreateChallengeDto,
    @Req() request: ExtendedRequest,
    @Res() response: Response,
  ) {
    const email = request.user.email;
    if (!email) {
      throw new UnauthorizedException('You are not authenticated.');
    }

    const { data, error, success } =
      await this.challengesService.createChallenge(body, email);
    if (!success) {
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }

    return response.json({
      success: true,
      data,
    });
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
