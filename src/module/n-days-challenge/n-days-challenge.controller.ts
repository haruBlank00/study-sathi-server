import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/module/auth/auth.guard';

@ApiTags('N-days-challenge')
@Controller('n-days-challenge')
@UseGuards(AuthGuard)
export class NDaysChallengeController {
  @ApiResponse({
    description: 'Get the list of challenges of the user',
  })
  @Get()
  async getMyNChallenges() {
    //
  }
}
