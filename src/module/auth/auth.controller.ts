import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/Public.decorator';
import { AuthService } from './auth.service';
@ApiTags('auth')
@Controller('auth')
@Public()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/refresh-token')
  async refreshToken(@Body() { refreshToken }: { refreshToken: string }) {
    const result = await this.authService.refreshToken(refreshToken);
    if (!result.success) {
      throw new HttpException('Oppsy happened', HttpStatus.EXPECTATION_FAILED);
    }

    return {
      success: true,
      data: {
        tokens: result.data,
      },
    };
  }
}
