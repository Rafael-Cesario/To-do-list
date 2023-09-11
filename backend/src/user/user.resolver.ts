import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserModel } from './user.model';
import { CreateUserInput } from './user.dto';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => String)
  async hello() {
    return 'Hello Nest graphql';
  }

  @Mutation(() => UserModel)
  async createUser(@Args('createUserData') createUserData: CreateUserInput) {
    return this.userService.createUser(createUserData);
  }
}
