import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Get,
  UseGuards,
  Req,
  Res,
  Redirect,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { Public } from 'src/decorators/Public.decorator';
import { AuthService } from './auth.service';
import { AuthProviderEnum } from './auth.enum';
import { UsersService } from '../users/users.service';
import { MagicLinkService } from '../magic_link/magic_link.service';

@ApiTags('auth')
@Controller('auth')
@Public()
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private magicLinkService: MagicLinkService
  ) {}

  @Public()
  @Post('/refresh-token')
  async refreshToken(@Body() { refreshToken }: { refreshToken: string }) {
    const result = await this.authService.refreshToken(refreshToken);
    if (!result.success) {
      throw new HttpException('Oppsy happened', HttpStatus.EXPECTATION_FAILED);
    }

    return {
      success: true,
      tokens: result.tokens,
    };
  }

  @Get('/github')
  @UseGuards(AuthGuard(AuthProviderEnum.GITHUB))
  githubLogin() {}

  @Get('/github/callback')
  @Redirect(`http://localhost:5173`)
  @UseGuards(AuthGuard(AuthProviderEnum.GITHUB))
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async githubCallback(@Req() req, @Res() res) {
    const user = await this.userService.upsertUser({
      email: req.user.profile.email,
    });
    const { accessToken, refreshToken} = await this.magicLinkService.generateTokens(
      user[0].email,
      user[0]._id,
    );
    return {
      success: true,
      data: {
        tokens: {
          accessToken,
          refreshToken,
        },
      },
    };
  }
}
