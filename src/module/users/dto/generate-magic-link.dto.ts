import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class GenerateMagicLinkDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'john@sathi.com',
    description: "User's email address",
  })
  email: string;
}
