import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { LOG_MODEL } from './constants';
import { Model } from 'mongoose';
import {
  CreateLogResponse,
  GetLogResponse,
  GetLogsResponse,
  Log,
} from './interface';
import { InjectModel } from '@nestjs/mongoose';
import { last } from 'rxjs';
import { CHALLENGES_MODEL } from '../challenges/constants';
import { Challenge } from '../challenges/interface';

@Injectable()
export class LogsService {
  constructor(
    @InjectModel(LOG_MODEL) private logModel: Model<Log>,
    @InjectModel(CHALLENGES_MODEL) private challengeModel: Model<Challenge>,
  ) {}
  async create(
    createLogDto: CreateLogDto,
    userId: string,
  ): Promise<CreateLogResponse> {
    const { content } = createLogDto;

    try {
      const lastDay = await this.findLastDay(createLogDto.challengeId);
      const nextDay = lastDay + 1;
      const log = await this.logModel.create({
        content,
        day: nextDay,
        challenge: createLogDto.challengeId,
      });
      const savedLog = log.save();

      return {
        success: true,
        message: 'Log created successfully.',
        data: {
          log,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: "Couldn't create a log. What happened :(",
      };
    }
  }

  /*
   * find all logs of current challenge
   */
  async findAll(challengeId: string): Promise<GetLogsResponse> {
    try {
      const challenge = await this.challengeModel
        .findById(challengeId)
        .populate('tags');
      const logs = await this.logModel.find({
        challenge: {
          _id: challengeId,
        },
      });

      return {
        success: true,
        data: {
          logs,
          challenge,
        },
        message: 'Logs for current challenge fetched successfully.',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async findOne(logId: string, challengeId: string): Promise<GetLogResponse> {
    try {
      console.log('finding log for ', logId);
      const log = await this.logModel
        .findOne({
          _id: logId,
          challenge: challengeId,
        })
        .populate('challenge');
      return {
        success: true,
        // log,
        data: {
          log,
        },
        message: 'Fetched a log successfully.',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch the log.',
      };
    }
  }

  update(id: number, updateLogDto: UpdateLogDto) {
    return `This action updates a #${id} log`;
  }

  remove(id: number) {
    return `This action removes a #${id} log`;
  }

  /**
   * finds the last day of the log
   * so we can calculate the next (today's) day
   */
  async findLastDay(challengeId: string) {
    const lastLog: Log = (
      await this.logModel
        .find({ challenge: challengeId })
        .sort({ day: -1 })
        .limit(1)
    )[0];
    console.log({ lastLog });
    return lastLog ? lastLog.day : 0;
  }
}
