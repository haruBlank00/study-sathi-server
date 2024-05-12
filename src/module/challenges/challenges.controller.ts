import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
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

    const result = await this.challengesService.createChallenge(body, email);
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.EXPECTATION_FAILED);
    }

    /**
     * how i want to return response?
     * {
     *  success: boolean
     * challenge: TChallenge,
     * message: string
     * }
     */
    const challenge = result.data.challenge;
    return response.json({
      success: true,
      challenge,
      message: 'Challenge created successfully.',
    });
  }

  @Get(':challengeId')
  async getChallenge(@Param('challengeId') challengeId: string) {
    const result = await this.challengesService.getChallenge(challengeId);

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.EXPECTATION_FAILED);
    }
    const challenge = result.data.challenge;
    return {
      success: true,
      challenge,
      message: 'Challenge fetched successfully.',
    };
  }

  @Put(':challengeId')
  async PutChallenge(
    @Param('challengeId') challengeId: string,
    @Body() body: CreateChallengeDto,
  ) {
    const result = await this.challengesService.putChallenge(challengeId, body);

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.EXPECTATION_FAILED);
    }

    const challenge = result.data.challenge;
    return {
      success: true,
      challenge,
      message: 'Challenge updated successfully.',
    };
  }

  @Delete(':challengeId')
  async deleteChallenge(@Param('challengeId') challengeId: string) {
    const result = await this.challengesService.deleteChallenge(challengeId);

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.EXPECTATION_FAILED);
    }

    return {
      success: true,
      message: 'Challenge deleted successfully.',
      data: {},
    };
  }

  @Get()
  async getChallenges() {
    const result = await this.challengesService.getChallenges();

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.EXPECTATION_FAILED);
    }

    const challenges = result.data.challenges;
    return {
      success: true,
      challenges,
      message: 'Challenges fetched successfully.',
    };
  }
}
