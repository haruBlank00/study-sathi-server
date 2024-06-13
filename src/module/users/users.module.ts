import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { S3Module } from '../s3/s3.module';
import { USER_MODEL } from './constants';
import { UserSchema } from './schema/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: USER_MODEL,
        schema: UserSchema,
      },
    ]),
    S3Module,
  ],
  providers: [UsersService],
  exports: [
    UsersService,
    MongooseModule.forFeature([
      {
        name: USER_MODEL,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UsersController],
})
export class UsersModule {}
