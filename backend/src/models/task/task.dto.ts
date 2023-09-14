import { IsEnum, IsNotEmpty, Length } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { Status } from './task.model';
import { Transform, Type } from 'class-transformer';

@InputType()
export class CreateTaskInput {
  @IsNotEmpty()
  @Field()
  listID: string;

  @Transform(({ value }: { value: string }) => value.toLowerCase().trim())
  @Length(3, 30)
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
