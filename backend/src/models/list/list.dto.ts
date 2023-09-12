import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Length } from 'class-validator';
import { Transform } from 'class-transformer';

@InputType()
export class CreateListInput {
  @Transform(({ value }: { value: string }) => value.toLowerCase().trim())
  @Length(3, 30)
  @Field()
  name: string;

  @IsNotEmpty()
  @Field()
  userID: string;
}

@InputType()
export class GetListInput {
  @IsNotEmpty()
  @Field()
  userID: string;
}