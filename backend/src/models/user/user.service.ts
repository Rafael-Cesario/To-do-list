import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserInput } from './user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { encryptPassword } from 'src/utils/crypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserData: CreateUserInput) {
    const isDuplicated = await this.prisma.user.findUnique({ where: { email: createUserData.email } });
    if (isDuplicated) throw new ConflictException('duplicated: This email is already in use.');

    const encryptedPassword = encryptPassword(createUserData.password);
    const user = await this.prisma.user.create({ data: { ...createUserData, password: encryptedPassword } });
    user.password = '';

    return user;
  }
}
