import { Injectable } from '@nestjs/common';
import { PutProfileDto } from './dto/put-profile.dto';
import { S3Service } from '../s3/s3.service';
import { S3 } from 'aws-sdk';
import { InjectModel } from '@nestjs/mongoose';
import { USER_MODEL } from './constants';
import { Model } from 'mongoose';
import { User } from './interface/user.interface';

@Injectable()
export class UsersService {
  private s3: S3;
  constructor(
    private s3Service: S3Service,
    @InjectModel(USER_MODEL) private userModel: Model<User>,
  ) {
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
    const user = this.userModel.find({ email });
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

  /*
   If the user does exist it return the existing user else create a new user.
   */

  async upsertUser({ email }: { email: string }) {
    const userExists = await this.findOne(email);
    if (userExists.length > 0) return userExists;
    const newUser = await this.userModel.create({ email });
    return this.userModel.findOne({ email: newUser.email });
  }
}
