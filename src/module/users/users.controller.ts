import {
  Body,
  Controller,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Put('profile')
  @UseInterceptors(FileInterceptor('avatar'))
  async putProfile(
    @UploadedFile() avatar: Express.Multer.File,
    @Body() { userName }: { userName: string },
  ) {
    return await this.usersService.putProfile({ avatar, userName });
  }
}
