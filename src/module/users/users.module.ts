import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_MODEL } from './constants';
import { UserSchema } from './schema/user.schema';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: USER_MODEL,
        schema: UserSchema,
      },
    ]),
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
})
export class UsersModule {}
