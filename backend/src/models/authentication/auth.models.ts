import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginModel {
  @Field()
  userID: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  token: string;
}
