import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { LogsService } from './logs.service';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { ExtendedRequest } from '../challenges/challenges.controller';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post()
  create(@Body() createLogDto: CreateLogDto, @Req() request: ExtendedRequest) {
    const { userId } = request.user;
    return this.logsService.create(createLogDto, userId);
  }

  @Get(':challengeId')
  findAll(@Param('challengeId') challengeId: string) {
    return this.logsService.findAll(challengeId);
  }

  @Get(':logId/challenges/:challengeId')
  findOne(
    @Param('logId') logId: string,
    @Param('challengeId') challengeId: string,
  ) {
    return this.logsService.findOne(logId, challengeId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLogDto: UpdateLogDto) {
    return this.logsService.update(+id, updateLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logsService.remove(+id);
  }
}
