import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class LoginInput {
  @IsEmail()
  @Field()
  email: string;

  @IsNotEmpty()
  @Field()
  password: string;
}
