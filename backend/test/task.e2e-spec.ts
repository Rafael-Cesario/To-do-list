import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { ListModel } from 'src/models/list/list.models';
import { UserModel } from 'src/models/user/user.model';
import { PrismaService } from 'src/prisma/prisma.service';

describe('Task', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let user: UserModel;
  let list: ListModel;

  const createUser = async () => {
    const user = await prisma.user.create({ data: { email: 'user01@email.com', name: 'user01', password: 'user123' } });
    return user;
  };

  const createList = async () => {
    const list = await prisma.list.create({ data: { name: 'list01', userID: user.id } });
    console.log({ list });
    return list;
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [AppModule] }).compile();
    prisma = moduleFixture.get(PrismaService);
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();

    user = await createUser();
    list = await createList();
  });

  afterEach(async () => {
    await prisma.list.deleteMany();
    await prisma.user.deleteMany();
  });

  describe('Create task', () => {
    it('Create a task', () => {});
  });
});
