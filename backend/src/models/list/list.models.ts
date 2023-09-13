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
