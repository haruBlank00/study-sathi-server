import { IsNotEmpty, IsString } from 'class-validator';

export class PutProfileDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  avatar: Express.Multer.File;
}
