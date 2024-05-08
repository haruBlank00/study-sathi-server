import { IsNotEmpty } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty()
  tags: string[];
}
