import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateListInput, GetListInput } from './list.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ListService {
  constructor(private prisma: PrismaService) {}

  async getLists({ userID }: GetListInput) {
    const user = await this.prisma.user.findUnique({ where: { id: userID }, include: { lists: { include: { tasks: { include: { tags: true } } } } } });
    if (!user) throw new NotFoundException('notFound: User not found');

    return user.lists;
  }

  async createList({ name, userID }: CreateListInput) {
    const isDuplicated = await this.prisma.list.findFirst({ where: { name } });
    if (isDuplicated) throw new ConflictException('duplicated: A list with the same name already exist');

    const list = await this.prisma.list.create({ data: { name, userID } });
    return list;
  }
}
