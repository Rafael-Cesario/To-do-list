import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './user.dto';

@Injectable()
export class UserService {
  async createUser(createUserData: CreateUserInput) {
    console.log({ createUserData });
  }
}
