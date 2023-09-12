import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ListModel {
  @Field()
  id: string;

  @Field()
  userID: string;

  @Field()
  name: string;

  @Field(() => [TaskModel], { nullable: 'items' })
  tasks: TaskModel[];
}

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

@ObjectType()
export class TagModel {
  @Field()
  id: string;

  @Field()
  taskId: string;

  @Field()
  name: string;

  @Field()
  color: string;
}

enum Status {
  NEXT,
  CURRENT,
  DONE,
}
