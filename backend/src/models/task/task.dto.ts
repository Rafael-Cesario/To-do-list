import { IsEnum, IsNotEmpty, Length } from 'class-validator';
import { Field, InputType, PickType } from '@nestjs/graphql';
import { Status } from './task.model';
import { Transform, Type } from 'class-transformer';

@InputType()
export class CreateTaskInput {
  @IsNotEmpty()
  @Field()
  listID: string;

  @Transform(({ value }: { value: string }) => value.toLowerCase().trim())
  @Length(3, 100)
  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;

  @IsEnum(Status)
  @Field()
  status: Status;

  @Type(() => TagInput)
  @Field(() => [TagInput], { nullable: 'items' })
  tags: TagInput[];
}

@InputType()
export class TagInput {
  @Length(3, 30)
  @Field()
  name: string;

  @Length(7)
  @Field()
  color: string;
}

@InputType()
export class UpdateTaskInput extends PickType(CreateTaskInput, ['title', 'description', 'status', 'tags']) {
  @IsNotEmpty()
  @Field()
  taskID: string;
}

@InputType()
export class DeleteTaskInput {
  @IsNotEmpty()
  @Field()
  taskID: string;
}
