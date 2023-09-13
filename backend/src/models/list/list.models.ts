import { Field, ObjectType } from '@nestjs/graphql';
import { TaskModel } from '../task/task.model';

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
