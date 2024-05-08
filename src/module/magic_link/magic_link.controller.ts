import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { one_min_as_ms } from 'src/constants/time';
import { Public } from 'src/decorators/Public.decorator';
import { SendMagicLinkDto } from './dto/send';
import { VerifyMagicLinkDto } from './dto/verify.dto';
import { MagicLinkService } from './magic_link.service';

@Controller('magic')
@Public()
export class MagicLinkController {
  constructor(private magicLinkService: MagicLinkService) {}

  @Throttle({
    default: {
      limit: 1,
      ttl: one_min_as_ms,
    },
  })
  @Post('send')
  async sendMagicLink(@Body() sendMagicLinkDto: SendMagicLinkDto) {
    const result = await this.magicLinkService.sendMagicLink(sendMagicLinkDto);

    console.log({ result }, '***');
    if (!result.success) {
      throw new HttpException(
        result.error.message,
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    return {
      success: result.success,
      data: result.data,
    };
  }

  @Post('verify')
  async verifyMagicLink(@Body() verifyMagicLink: VerifyMagicLinkDto) {
    const result = await this.magicLinkService.verifyMagicLink(verifyMagicLink);

    if (!result.success) {
      throw new HttpException(
        result.error.message,
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    return {
      success: true,
      data: {
        message: 'Your magic link has been verified successfully.',
        tokens: result.data,
      },
    };
  }
}
