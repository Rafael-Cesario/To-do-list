import { ConflictException, Injectable } from '@nestjs/common';
import { CreateListInput } from './list.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ListService {
  constructor(private prisma: PrismaService) {}

  async createList({ name, userID }: CreateListInput) {
    const isDuplicated = await this.prisma.list.findFirst({ where: { name } });
    if (isDuplicated) throw new ConflictException('duplicated: A list with the same name already exist');

    const list = await this.prisma.list.create({ data: { name, userID } });
    return list;
  }
}
