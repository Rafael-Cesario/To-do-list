import { ObjectType, Field } from '@nestjs/graphql';
import { TagModel } from '../list/list.models';

@ObjectType()
export class TaskModel {
  @Field()
  id: string;

  @Field()
  listID: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  createdAt: Date;

  @Field()
  status: Status;

  @Field(() => [TagModel], { nullable: 'items' })
  tags: TagModel[];
}

enum Status {
  NEXT,
  CURRENT,
  DONE,
}
