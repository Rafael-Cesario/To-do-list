import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { Length, IsEmail, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Transform(({ value }: { value: string }) => value.toLowerCase().trim())
  @IsEmail()
  @Field()
  email: string;

  @Length(3, 30)
  @Field()
  name: string;

  @MinLength(10)
  @Field()
  password: string;
}
