import { Query, Resolver } from '@nestjs/graphql';
import { UserModel } from './user.model';

@Resolver()
export class UserResolver {
  @Query(() => UserModel)
  async getOneUser() {
    const user: UserModel = {
      id: '123',
      email: 'email',
      name: 'user01',
      password: '12123',
      createdAt: "some date"
    };

    return user;
  }
}
