import { Field, InputType } from '@nestjs/graphql';
import { Length, IsEmail, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
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
