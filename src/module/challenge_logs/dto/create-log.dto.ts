import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString, IsNumber } from 'class-validator';

export class CreateLogDto {
  @IsString()
  @ApiProperty({
    example: 'Today i learnd to build 30 days of code',
    description: 'The content of the log',
  })
  content: string;
  //
  // @IsNumber()
  // day: number;

  @IsString()
  challengeId: string;
}
