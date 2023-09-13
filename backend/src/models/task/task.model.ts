import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';

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

export enum Status {
  NEXT = 'NEXT',
  CURRENT = 'CURRENT',
  DONE = 'DONE',
}

registerEnumType(Status, { name: 'Status' });
