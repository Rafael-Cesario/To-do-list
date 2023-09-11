import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginModel {
  @Field()
  userID: string;

  @Field()
  email: string;

  @Field()
  token: string;
}
