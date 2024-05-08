import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
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
}
