import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ListModel {
  @Field()
  id: string;

  @Field()
  userID: string;

  @Field()
  name: string;
}
