import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateChallengeDto {
  @IsString()
  @ApiProperty({
    example: '30 days of code',
    description: 'The name of the challenge',
  })
  name: string;

  @IsString()
  @ApiProperty({
    example: 'Learn how to build 30 days of code',
    description: 'The description of the challenge',
  })
  description: string;

  @IsNumber()
  @ApiProperty({
    example: 30,
    description: 'The number of days of the challenge',
  })
  days: number;

  @IsString()
  @ApiProperty({
    example: 'public',
    description: 'The privacy of the challenge',
  })
  privacy: string;

  @IsString({ each: true })
  @ApiProperty({
    example: ['frontend', 'backend'],
    description: 'The tags of the challenge',
  })
  tags: string[];
}

export class PatchClassDto extends CreateChallengeDto {}
