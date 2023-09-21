import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginInput } from './auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { checkPassword } from 'src/utils/crypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async login({ email, password }: LoginInput) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('unauthorized: Invalid credentials');

    const isSamePassword = checkPassword(password, user.password);
    if (!isSamePassword) throw new UnauthorizedException('unauthorized: Invalid credentials');

    const token = await this.jwt.signAsync({ email });
    return { userID: user.id, email: user.email, token, name: user.name };
  }
}
