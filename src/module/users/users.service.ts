import { Injectable } from '@nestjs/common';
import { PutProfileDto } from './dto/put-profile.dto';
import { S3Service } from '../s3/s3.service';
import { S3 } from 'aws-sdk';

@Injectable()
export class UsersService {
  private s3: S3;
  constructor(private s3Service: S3Service) {
    this.s3 = this.s3Service.getS3Client();
  }
  private readonly users = [
    {
      userId: 1,
      email: 'john@sathi.com',
    },
    {
      userId: 2,
      email: 'source@sathi.com',
    },
  ];
  async findOne(email: string) {
    const user = this.users.find((user) => user.email === email);
    return user;
  }

  async putProfile({ avatar, userName }: PutProfileDto) {
    console.log({ avatar, userName });
    const params: S3.PutObjectRequest = {
      Bucket: 'study-sathi-bucket',
      Key: avatar.originalname,
      Body: avatar.buffer,
      ContentType: avatar.mimetype,
      ACL: 'public-read',
    };
    const data = await this.s3.upload(params).promise();
    console.log({ data });
    return { data };
  }
}
