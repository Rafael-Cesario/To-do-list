import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [JwtModule.register({ global: true, secret: jwtConstants.secret, signOptions: { expiresIn: jwtConstants.expiresIn } })],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
