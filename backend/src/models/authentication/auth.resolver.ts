import { Injectable } from '@nestjs/common';
import { Args, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginModel } from './auth.models';
import { LoginInput } from './auth.dto';

@Injectable()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginModel)
  async login(@Args('loginData') loginData: LoginInput) {
    return this.authService.login(loginData);
  }
}
