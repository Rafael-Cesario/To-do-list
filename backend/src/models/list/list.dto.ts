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

@InputType()
export class UpdateListInput {
  @IsNotEmpty()
  @Field()
  listID: string;

  @Field()
  @Length(3, 30)
  @Transform(({ value }: { value: string }) => value.toLowerCase().trim())
  newName: string;
}

@InputType()
export class DeleteListInput {
  @IsNotEmpty()
  @Field()
  listID: string;
}
