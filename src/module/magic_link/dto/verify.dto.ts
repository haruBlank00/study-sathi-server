import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class VerifyMagicLinkDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'john@sathi.com',
    description: "User's email address",
  })
  email: string;

  token: string;
}
