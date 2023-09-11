import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput, UserModel } from './user.model';

@Resolver()
export class UserResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => String)
  async hello() {
    return 'Hello Nest graphql';
  }

  @Mutation(() => UserModel)
  async createUser(@Args('createUserData') createUserData: CreateUserInput) {
    console.log({ createUserData });
    return;
  }
}
