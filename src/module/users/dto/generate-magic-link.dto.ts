import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class GenerateMagicLinkDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'john@sathi.com',
    description: "User's email address",
  })
  email: string;
}

export class UpdateProfile {
  @IsString()
  username: string;

  // avatar: File;
}
